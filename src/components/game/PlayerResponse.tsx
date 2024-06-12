import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useGameContext } from '../../context/GameContext';

interface PlayerResponseProps {
  characterColor: string;
}

const PlayerResponse: React.FC<PlayerResponseProps> = ({ characterColor }) => {
  const { 
    phase, 
    startGuessing, 
    startChecking
  } = useGameContext();
  const [userGuess, setUserGuess] = useState('');

  const handleStartPress = () => {
    startGuessing();
  };

  const handleSendPress = () => {
    if (phase === 'guessing' || phase === 'failure') { 
      startChecking(userGuess); 
      setUserGuess(''); 
    }
  };

  if (phase === 'greeting') {
    return (
      <View style={styles.inputContainerEmpezar}>
        <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: characterColor }]} 
          onPress={handleStartPress}
        >
          <Text style={styles.buttonTextEmpezar}>Empezar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isDisabled = ['loading', 'success', 'checking', 'farewell'].includes(phase);  
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="¿Cuál es la palabra?"
        placeholderTextColor="#999"
        editable={!isDisabled}
        value={userGuess}
        onChangeText={setUserGuess}
      />
      <TouchableOpacity
        style={[
          styles.submitButton,
          { backgroundColor: isDisabled ? '#ccc' : characterColor },
        ]}
        onPress={handleSendPress} 
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  inputContainerEmpezar: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 15,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
  },
  submitButton: {
    backgroundColor: '#4E9C44', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire', 
  },
  buttonTextEmpezar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire',
  },
});

export default PlayerResponse;