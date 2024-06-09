import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import GameScreen from './src/screens/GameScreen';
import GameMenuScreen from './src/screens/GameMenuScreen';
import CharacterSelectionScreen from './src/screens/CharacterSelectionScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { RootStackParamList } from './src/constants/types'; // Asegúrate de que esta ruta es correcta
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { useLoadFonts } from './src/constants/fonts';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import GameProvider from './src/context/GameContext';
const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AuthStackNavigator = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="Home" component={HomeScreen} />
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="Register" component={RegisterScreen} />
  </RootStack.Navigator>
);

const GameStackNavigator = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="GameMenu" component={GameMenuScreen} />
    <RootStack.Screen name="CharacterSelection" component={CharacterSelectionScreen} />
    <RootStack.Screen name="Profile" component={ProfileScreen} />
    <GameProvider> {/* <-- Envuelve GameScreen con el proveedor */}
      <RootStack.Screen name="GameScreen" component={GameScreen} /> 
    </GameProvider>
  </RootStack.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./assets/splash.png')} style={styles.splashImage} />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <RootStack.Screen name="GameStack" component={GameStackNavigator} />
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Ajusta el color de fondo según tu diseño
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ajusta esta propiedad según tu diseño
  },
});

export default App;