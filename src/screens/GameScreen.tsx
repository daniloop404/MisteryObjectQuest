import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Character } from '../services/characterService';
import { RootStackParamList } from '../constants/types'; // Asegúrate de importar RootStackParamList desde el archivo correcto

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen: React.FC = () => {
  const [hint, setHint] = useState('');
  const [lives, setLives] = useState(3);
  const navigation = useNavigation();
  const route = useRoute<GameScreenRouteProp>();
  const { character } = route.params;

  const handleLogout = () => {
    // Aquí iría la lógica para desloguearse
  };

  const handleInstructions = () => {
    // Aquí iría la lógica para mostrar las instrucciones
  };

  const handleHint = () => {
    setHint('Esta es una pista.');
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/backgrounds/backgroundHome.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.innerContainer}>
        <Text style={[styles.characterName, { color: character.color }]}>{character.name}</Text>
        <View style={styles.characterContainer}>
          <Image 
            source={require('../../assets/images/loadingImage.png')} 
            style={styles.characterImage}
          />
          <Text style={styles.characterDialogue}>
            "¡Hola, aventurero! Soy {character.name}, lista para una nueva expedición contigo."
          </Text>
        </View>
        <View style={styles.hintContainer}>
          <TouchableOpacity style={[styles.hintButton, { backgroundColor: character.color }]} onPress={handleHint}>
            <Text style={styles.buttonText}>Pista</Text>
          </TouchableOpacity>
          <Text style={styles.hintText}>{hint}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.livesText}>Intentos: {lives}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Puntuación: 150</Text>
          <Text style={styles.timeText}>Tiempo: 02:30</Text>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: character.color }]} onPress={() => console.log('Respuesta enviada')}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Escribe la palabra descrita..."
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.instructionsButton]} onPress={handleInstructions}>
            <Text style={styles.buttonText}>Instrucciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
    borderRadius: 20,
    width: '96%',
    alignItems: 'center',
  },
  characterName: {
    fontSize: 40,
    color: '#1B2353',
    fontFamily: 'Dino', // Aplica la fuente Dino aquí
  },
  characterContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  characterImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  characterDialogue: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Light', // Aplica la fuente Light aquí
    textAlign: 'center',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
    fontFamily: 'Light', // Aplica la fuente Light aquí
    color: '#D83838',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#1B2353',
    marginVertical: 10,
  },
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
  livesText: {
    fontSize: 22, // Aplica la fuente Light aquí
    marginVertical: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 20,
  },
  timeText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    
  },
  instructionsButton: {
    backgroundColor: '#D48236',
    width: '58%', // Ajuste de tamaño para relación 60:40
    marginRight: '4%', // Pequeño espacio entre los botones
    elevation: 3, // Agrega sombra para elevar el botón
  },
  logoutButton: {
    backgroundColor: '#C44E4E',
    width: '38%', // Ajuste de tamaño para relación 60:40
    elevation: 3, // Agrega sombra para elevar el botón
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire', // Aplica la fuente Light aquí
  },
});

export default GameScreen;