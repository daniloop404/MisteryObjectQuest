import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

type GamePhase = 'loading' | 'greeting' | 'guessing' | 'checking' | 'success' | 'failure' | 'farewell' ;

interface GameContextType {
  lives: number;
  score: number;
  timeRemaining: number;
  phase: GamePhase;
  startNewGame: () => void;
  startGreeting: () => void;
  startGuessing: () => void;
  startChecking: () => void; // Nueva función para la fase de checking
  handleSuccess: () => void;
  handleFailure: () => void;
  handleCheckGuess: (userGuess: string) => void; // Función para manejar la verificación de la respuesta
}

interface Props {
  children: React.ReactNode;
}

const GameContext = createContext<GameContextType | null>(null);

const GameProvider: React.FC<Props> = ({ children }) => {
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [phase, setPhase] = useState<GamePhase>('loading');

  const startNewGame = () => {
    console.log("Iniciando nuevo juego");
    setLives(3);
    setScore(0);
    setPhase('greeting'); // <--- Asegúrate de que la fase inicial sea 'loading'
    startGreeting();      // <--- Llama a startGreeting para comenzar la secuencia
  };


  
  // Temporizador como una función
  const startTimer = useCallback((duration: number = 30) => {
    console.log(`Iniciando temporizador para la fase: ${phase}`); 
    setTimeRemaining(duration); 

    const timerId = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        handleTimeout(); 
      }
    }, 1000);

    return timerId;  
  }, [timeRemaining, phase]);

  // Función para manejar el fin del tiempo
  const handleTimeout = () => {
    console.log('Tiempo agotado!');
    if (lives > 0) {
      setLives(lives - 1);
      handleFailure(); 
    } else {
      setPhase('farewell');
    }
  };

  // Iniciar el temporizador solo en la fase 'guessing'
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (phase === 'guessing') {
      timerId = startTimer();
    }
    return () => clearTimeout(timerId);
  }, [phase, startTimer]);



  const startGreeting = () => {
    console.log('Fase: Saludo');
    setPhase('greeting');
    setTimeout(() => {
      startGuessing();
    }, 5000); // Mostrar saludo por 5 segundos
  };

  const startGuessing = () => {
    console.log('Fase: Adivinanza');
    setPhase('guessing');
    startTimer(); 
  };

  // Función para iniciar la fase de checking
  const startChecking = () => {
    console.log('Fase: Verificar');
    setPhase('checking');
  };

  const handleSuccess = () => {
    console.log('Fase: Éxito');
    setScore(score + 1);
    setPhase('success');
    setTimeout(() => {
      startGuessing();
    }, 3000); 
  };

  const handleFailure = () => {
    console.log('Fase: Fallo');
    if (lives > 1) {
      setLives(lives - 1);
      setPhase('failure');
      setTimeout(() => {
        startGuessing();
      }, 3000); 
    } else {
      setLives(0);
      setPhase('farewell');
    }
  };

  // Función para manejar la verificación de la respuesta
  const handleCheckGuess = (userGuess: string) => {
    // Aquí puedes implementar la lógica para verificar la respuesta
    // contra la palabra correcta. 
    // Por ejemplo:
    // const isCorrect = userGuess.toLowerCase() === correctWord.toLowerCase(); 

    // Después de la verificación:
    if (/* isCorrect */ true) {
      handleSuccess(); 
    } else {
      handleFailure(); 
    }
  };

  const contextValue: GameContextType = {
    lives,
    score,
    timeRemaining,
    phase,
    startNewGame,
    startGreeting,
    startGuessing,
    startChecking,
    handleSuccess,
    handleFailure,
    handleCheckGuess,
  };

 return (
    <GameContext.Provider value={{ ...contextValue, startNewGame }}> 
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