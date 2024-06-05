import React, { useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { logoutUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { pushCharacter } from '../services/pushCharacterService'; // Importa el servicio
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSequence, withRepeat } from 'react-native-reanimated';

const GameMenuScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useAuth();
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animateText = () => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1
    );
  };

  const handleLogout = async () => {
    await logoutUser();
    logout();
  };

  const handleAddCharacter = async () => {
    try {
      const response = await pushCharacter();
      if (response.success) {
        Alert.alert('Éxito', 'Personaje agregado correctamente.');
      } else {
        Alert.alert('Error', response.error || 'Ocurrió un error al agregar el personaje.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/backgrounds/backgroundHome.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Animated.Text 
          style={[styles.title, { fontFamily: 'Dino' }, animatedStyles]}
          onLayout={animateText}
        >
          Mystery Object Quest
        </Animated.Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CharacterSelection')}>
          <Text style={styles.buttonText}>Jugar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('Instrucciones')}>
          <Text style={styles.buttonText}>Instrucciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddCharacter}>
          <Text style={styles.buttonText}>Agregar Personaje</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: '#FFFFFF',
    marginBottom: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#C44E4E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    elevation: 12,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 4,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Dino',
  },
});

export default GameMenuScreen;