import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

interface PlayerResponseProps {
  characterColor: string;
}

const PlayerResponse: React.FC<PlayerResponseProps> = ({characterColor }) => {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity style={[styles.submitButton, { backgroundColor: characterColor }]}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu respuesta aquí..."
        placeholderTextColor="#999"
      />
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
    elevation: 3, // Agrega sombra para elevar el botón
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire', // Aplica la fuente Light aquí
  },
});

export default PlayerResponse;