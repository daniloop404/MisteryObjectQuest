import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { NavigationProp } from '@react-navigation/native'; // Añadir esto
import { RootStackParamList } from '../constants/types'; // Asegúrate de que la ruta es correcta
import { UserInfo } from '../services/profileService'; 
import { CharacterInfo } from '../services/characterService';
import { saveMaxScore  } from '../services/profileService';
import { GeminiService } from '../services/geminiService';
import WordsService from '../services/WordsService';

type GamePhase = 'loading' | 'greeting' | 'guessing' | 'checking' | 'success' | 'failure' | 'farewell';

interface GameContextType {
  output: string;
  lives: number;
  score: number;
  timeRemaining: number;
  phase: GamePhase;
  error: string | null;
  startGame: () => void;
  startNewGame: () => void;
  startGreeting: () => void;
  startGuessing: () => void;
  startChecking: (userGuess: string) => void;
  handleSuccess: (userGuess: string) => Promise<void>;
  handleFailure: (timeout?: boolean, userWord?: string) => void;
  navigation: NavigationProp<RootStackParamList>;
  clearError: () => void; // Añadir esto
}

interface Props {
  children: React.ReactNode;
  character: CharacterInfo;
  user: UserInfo;
}

interface GameInfo {
  currentPhase: string;
  timeleft?: string;
  currentscore: number;
  currentword: string;
  lives: number;
  userword: string;
  currentTime: string;
}

const GameContext = createContext<GameContextType | null>(null);

const GameProvider: React.FC<Props & { navigation: NavigationProp<RootStackParamList> }> = ({ children, character, user, navigation }) => {
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [phase, setPhase] = useState<GamePhase>('loading');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null); // Añadir estado de error
  const [currentWord, setCurrentWord] = useState('');
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [isGeminiServiceReady, setIsGeminiServiceReady] = useState(false);
  const farewellTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeGeminiService = async () => {
      if (character && user) {
        const newGeminiService = new GeminiService(character, user);
        await newGeminiService.startChat();
        setGeminiService(newGeminiService);
        setIsGeminiServiceReady(true);
      }
    };
    initializeGeminiService();
  }, [character, user]);

  useEffect(() => {
    if (isGeminiServiceReady) {
      startGreeting();
    }
  }, [isGeminiServiceReady]);

  const handleTimeout = () => {
    console.log('Tiempo agotado.');
    handleFailure(true);
  };

  const getCurrentTime = (): string => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Ajusta las horas al formato 12h
  
    return `${hours12}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    let id: NodeJS.Timeout | null = null;

    if (phase === 'guessing' || phase === 'failure') {
      console.log('Iniciando temporizador...');
      setTimeRemaining(20); 
      id = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(id!); 
            handleTimeout();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } 

    // Limpiar el temporizador al desmontar el componente
    return () => { 
      if (id) {
        console.log("Limpiando temporizador..."); // <-- Añadir un console.log para verificar
        clearInterval(id);
      }
    };
  }, [phase]);

  const startGame = () => {
    setPhase('loading');
    setError(null); // Resetear el error al iniciar el juego
    setTimeout(() => startGreeting(), 0);
  };

  const startNewGame = () => {
    setLives(3);
    setScore(0);
    setError(null); // Resetear el error al iniciar un nuevo juego
    startGreeting();
  };

  const startGreeting = async () => {
    console.log('se ingreso a greeting');

    if (!geminiService) {
      return;
    }

    try { 
      const gameInfo: GameInfo = {
        currentPhase: 'greeting',
        timeleft: '20',
        currentscore: score,
        currentword: '',
        lives: lives,
        userword: '',
        currentTime: getCurrentTime(),
      };

      const response = await geminiService.sendMessage('', gameInfo);   
      setOutput(response[0].output); 
      setPhase('greeting');
      console.log('se inicio el greeting');
    } catch (error) {
      console.error("Error en startGreeting:", error);
      if (error instanceof Error) {
        setError("Error en handleFailure: " + error.message); // Guardar el mensaje de error
      }// Actualizar el estado de error
      console.log('el greeting fallo');
    }
  };

  const startGuessing = async () => {
    if (!geminiService) {
      console.error("Error: geminiService no está disponible en startGuessing");
      return; 
    }

    setPhase('loading'); 
    try {
      const newWord = WordsService.getRandomWord(character, usedWords);
      setCurrentWord(newWord);
      setUsedWords([...usedWords, newWord]);

      const gameInfo: GameInfo = {
        currentPhase: 'guessing',
        timeleft: '20',
        currentscore: score,
        currentword: newWord,
        lives: lives,
        userword: '',
        currentTime: getCurrentTime(),
      };

      const response = await geminiService.sendMessage('', gameInfo);
      setOutput(response[0].output); 

      setPhase('guessing');
      console.log('Fase actual: guessing');
    } catch (error) {
      console.error("Error en startGuessing:", error);
      if (error instanceof Error) {
        setError("Error en handleFailure: " + error.message); // Guardar el mensaje de error
      } // Actualizar el estado de error
    }
  };

  const startChecking = async (userGuess: string) => {
    if (!geminiService) {
      return;
    }

    setPhase('checking');
    try {
      const gameInfo = {
        currentPhase: 'checking',
        timeleft: timeRemaining.toString(),
        currentscore: score,
        currentword: currentWord,
        lives: lives,
        userword: userGuess,
        currentTime: getCurrentTime(),
      };

      const response = await geminiService.sendMessage('', gameInfo);
      const guessResult = response[0].guess;

      if (guessResult === 'correct') {
        handleSuccess(userGuess);
      } else {
        handleFailure(false, userGuess); // Enviamos la palabra del usuario en el fallo
      }
    } catch (error) {
      console.error("Error en startChecking:", error);
      if (error instanceof Error) {
        setError("Error en handleFailure: " + error.message); // Guardar el mensaje de error
      } // Actualizar el estado de error
    }
  };

  const handleSuccess = async (userGuess: string) => { 
    if (!geminiService) {
      return;
    }
    setPhase('loading');
    setScore(score + 1);
    
    console.log('Fase actual: success');

    try {
      const gameInfo = {
        currentPhase: 'success',
        timeleft: timeRemaining.toString(),
        currentscore: score + 1,
        currentword: currentWord,
        lives: lives,
        userword: userGuess,
        currentTime: getCurrentTime(),
      };

      const response = await geminiService.sendMessage('', gameInfo);
      setOutput(response[0].output); // Actualizar output con la respuesta del modelo
      setPhase('success');
      // Esperar 10 segundos antes de comenzar a adivinar de nuevo
      setTimeout(() => {
        startGuessing();
      }, 10000); 

    } catch (error) {
      console.error("Error en handleSuccess:", error);
      if (error instanceof Error) {
        setError("Error en handleFailure: " + error.message); // Guardar el mensaje de error
      } // Actualizar el estado de error
      // Manejar el error adecuadamente, por ejemplo, volviendo a la fase 'guessing'
      startGuessing();
    }
  };

  const startFarewell = async (userWord: string, currentWord: string) => {
    if (!geminiService) {
      console.error("Error: geminiService no está disponible en startFarewell");
      return;
    }
  
    setPhase('loading'); // Temporarily set to loading while we fetch the farewell message
  
    try {
      const gameInfo: GameInfo = {
        currentPhase: 'farewell',
        timeleft: '0',
        currentscore: score,
        currentword: currentWord,
        lives: 0,
        userword: userWord,
        currentTime: getCurrentTime(),
      };
  
      const response = await geminiService.sendMessage('', gameInfo);
      setOutput(response[0].output);
      setPhase('farewell');
      console.log('Fase actual: farewell');
  
      // Guardar el puntaje máximo en el perfil del usuario
      await saveMaxScore(user.uid, character.name, score, character.image, character.color);
  
      // Navegar a CharacterSelection después de 20 segundos
      farewellTimeoutRef.current = setTimeout(() => {
        navigation.navigate('CharacterSelection');
      }, 20000);
  
      // Retorna la referencia (opcional, solo si necesitas acceder a ella fuera de la función)
      return farewellTimeoutRef;
    } catch (error) {
      console.error("Error en startFarewell:", error);
      if (error instanceof Error) {
        setError("Error en handleFailure: " + error.message); // Guardar el mensaje de error
      }// Actualizar el estado de error
    }
  };

  useEffect(() => {
    // Función de limpieza para el timeout
    return () => {
      if (farewellTimeoutRef.current) {
        console.log("Limpiando timeout de farewell...");
        clearTimeout(farewellTimeoutRef.current);
      }
    };
  }, []); // Este useEffect se ejecuta al desmontar el componente
  
  const handleFailure = async (timeout: boolean = false, userWord?: string) => {
    console.log("Entrando en handleFailure. Fase actual:", phase, "Vidas:", lives); 
    if (!geminiService) {
      return;
    }
  
    if (timeout) {
      console.log('Falló debido a tiempo agotado');
    } else {
      console.log('Falló debido a respuesta incorrecta');
    }
  
    // 1. Comprobar si quedan vidas ANTES de restar:
    if (lives <= 1) { 
      setLives(0); // Asegurar que las vidas quedan a 0
      startFarewell(userWord || '', currentWord); // Llamar a la nueva función startFarewell con userWord y currentWord
      return; // Salir de la función después de ir a 'farewell'
    }
  
    // 2. Si aún quedan vidas, restar una y seguir con 'failure':
    setLives(lives - 1); 
    setPhase('loading');
  
    try {
      const gameInfo = {
        currentPhase: 'failure',
        timeleft: timeout ? 'user time left out' : timeRemaining.toString(),
        currentscore: score,
        currentword: currentWord,
        lives: lives - 1, // Mostrar las vidas actualizadas
        userword: userWord ? userWord : '',
        currentTime: getCurrentTime(),
      };
  
      const response = await geminiService.sendMessage('', gameInfo);
      setOutput(response[0].output);
      setPhase('failure');
      console.log('Fase actual: failure');
    } catch (error) {
      console.error("Error en handleFailure:", error);
      if (error instanceof Error) {
        setError("Error en handleFailure: " + error.message); // Guardar el mensaje de error
      }// Actualizar el estado de error
    }
  };
  const clearError = () => {
    setError(null);
  };

  const contextValue: GameContextType = {
    lives,
    score,
    timeRemaining,
    phase,
    output,
    error,
    startGame,
    startNewGame,
    startGreeting,
    startGuessing,
    startChecking,
    handleSuccess,
    handleFailure,
    navigation,
    clearError, // Añadir esto
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export default GameProvider;
