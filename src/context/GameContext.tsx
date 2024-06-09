import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
type GamePhase = 'loading' | 'greeting' | 'guessing' | 'success' | 'failure' | 'farewell' ;

interface GameContextType {
  lives: number;
  score: number;
  timeRemaining: number;
  phase: GamePhase;
  startNewGame: () => void;
  startGreeting: () => void;
  startGuessing: () => void;
  handleSuccess: () => void;
  handleFailure: () => void;
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

  const startTimer = useCallback(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining <= 0) {
      return;
    }

    timerId = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        if (lives > 0) {
          setLives(lives - 1);
          setTimeRemaining(30);
        } else {
          setPhase('farewell');
        }
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeRemaining, lives]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining > 0 && phase === 'guessing') {
      timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [timeRemaining, phase]);

  const startNewGame = () => {
    setLives(3);
    setScore(0);
    setTimeRemaining(30);
    setPhase('greeting');
  };

  const startGreeting = () => {
    setPhase('greeting');
    setTimeout(() => {
      setPhase('guessing');
      setTimeRemaining(30);
    }, 10000);
  };

  const startGuessing = () => {
    setPhase('guessing');
    setTimeRemaining(30);
  };

  const handleSuccess = () => {
    setScore(score + 1);
    setPhase('success');
    setTimeout(startGuessing, 3000); 
  };

  const handleFailure = () => {
    if (lives > 1) {
      setLives(lives - 1);
      setPhase('failure');
      setTimeout(startGuessing, 3000);
    } else {
      setLives(0);
      setPhase('farewell');
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
    handleSuccess,
    handleFailure,
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