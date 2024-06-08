import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface GameContextType {
  lives: number;
  score: number;
  timeRemaining: number;
  // ... otras variables que necesites ...
  startNewGame: () => void;
  // ... otras funciones que necesites ...
}
interface Props {
    children: React.ReactNode;
  }
const GameContext = createContext<GameContextType | null>(null);

const GameProvider: React.FC<Props> = ({ children }) => { 
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  // ... otras variables de estado ...

  const startTimer = useCallback(() => { 
    let timerId: NodeJS.Timeout; // Cambiado a timerId

    if (timeRemaining <= 0) {
      return; // No hacer nada si el tiempo ya es 0 o menor
    }

    timerId = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // Manejar fin del tiempo:
        if (lives > 0) { 
          setLives(lives - 1);
          setTimeRemaining(30); // Reiniciar temporizador
        } else {
          // Fin del juego (vidas = 0)
          // ... Implementa la lógica de fin del juego aquí ...
        }
      }
    }, 1000);

    return () => clearTimeout(timerId); // Devolver la función para limpiar el temporizador
  }, [timeRemaining, lives]); 

  useEffect(() => {
    let timerId: NodeJS.Timeout; 
  
    if (timeRemaining <= 0) {
      if (lives > 0) { 
        setLives(lives - 1);
        setTimeRemaining(30); // Reiniciar timeRemaining aquí
      } else {
        // Fin del juego (vidas = 0)
        // ... Implementa la lógica de fin del juego aquí ...
      }
    }
  
    if (timeRemaining > 0) { // Iniciar el temporizador solo si timeRemaining > 0
      timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1); 
      }, 1000);
    }
  
    return () => clearTimeout(timerId); 
  }, [timeRemaining, lives]);
  const startNewGame = () => {
    setLives(3);
    setScore(0);
    setTimeRemaining(30);
    // ... reiniciar otras variables ...
  };

  // ... otras funciones del contexto ...

  const contextValue: GameContextType = {
    lives,
    score,
    timeRemaining,
    startNewGame,
    // ... otras variables y funciones ...
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