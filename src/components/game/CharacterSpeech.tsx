import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface CharacterSpeechProps {
  character: {
    name: string;
    color: string;
  };
}

const CharacterSpeech: React.FC<CharacterSpeechProps> = ({ character }) => {
  const [hint, setHint] = useState('');

  const handleHintPress = () => {
    setHint('Esta es una pista.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.characterDialogue}>
        {`"¡Hola, aventurero! Soy ${character.name}, lista para una nueva expedición contigo."`}
      </Text>
      <View style={styles.hintContainer}>
        <TouchableOpacity style={[styles.hintButton, { backgroundColor: character.color }]} onPress={handleHintPress}>
          <Text style={styles.buttonText}>Pista</Text>
        </TouchableOpacity>
        <Text style={styles.hintText}>{hint}</Text>
      </View>
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
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  hintButton: {
    backgroundColor: '#1B2353',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
  },
  hintText: {
    fontSize: 18,
    fontFamily: 'Light', 
    color: '#D83838',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire', 
  },
});

export default CharacterSpeech;