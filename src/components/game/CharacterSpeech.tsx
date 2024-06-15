import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'; 
import { useGameContext } from '../../context/GameContext';

interface CharacterSpeechProps {
  character: {
    name: string;
    color: string;
  };
}

const CharacterSpeech: React.FC<CharacterSpeechProps> = ({ character }) => {
  const { phase, output } = useGameContext(); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    let thinkingInterval: NodeJS.Timeout;

    switch (phase) {
      case 'loading':
      case 'checking': // Agregar checking aquí
        setMessage('Pensando');
        thinkingInterval = setInterval(() => {
          setMessage((prev) => (prev === 'Pensando...' ? 'Pensando' : prev + '.'));
        }, 500);
        break;
      case 'greeting':
      case 'guessing':
      case 'failure':
      case 'success':
      case 'farewell':
        setMessage(output); 
        break;
      default:
        setMessage(''); 
        break;
    }

    return () => {
      clearInterval(thinkingInterval);
    };
  }, [phase, output]); 

  return (
    <View style={styles.container}>
      <Text style={styles.characterDialogue}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  characterDialogue: {
    marginTop: 5,
    fontSize: 20,
    fontFamily: 'Light', 
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire', 
  },
});

export default CharacterSpeech;