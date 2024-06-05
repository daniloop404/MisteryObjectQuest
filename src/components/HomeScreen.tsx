import React, { useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useLoadFonts } from '../constants/fonts';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSequence, withRepeat } from 'react-native-reanimated';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

const HomeScreen: React.FC = () => {
  const fontsLoaded = useLoadFonts();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Crea un valor compartido para controlar el tamaño del texto
  const scale = useSharedValue(1);

  // Crea un estilo animado que se actualiza con el valor compartido
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Función para iniciar la animación de forma continua
  const animateText = () => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1500 }), 
        withTiming(1, { duration: 1500}) 
      ),
      -1 // Repite la animación indefinidamente
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/backgrounds/backgroundHome.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Aplica el estilo animado al Text */}
        <Animated.Text 
          style={[styles.title, { fontFamily: 'Dino' }, animatedStyles]}
          onLayout={animateText} // Inicia la animación después de que el texto se haya renderizado
        >
          Mystery Object Quest
        </Animated.Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.buttonText, { fontFamily: 'Dino' }]}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.buttonText, { fontFamily: 'Dino' }]}>Registro</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 50,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 40,
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
  },
});

export default HomeScreen;