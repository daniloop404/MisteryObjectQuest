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
import { RootStackParamList } from './src/constants/types';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { useLoadFonts } from './src/constants/fonts';
import { View, ActivityIndicator } from 'react-native';

const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    <RootStack.Screen name="GameScreen" component={GameScreen} />
    <RootStack.Screen name="CharacterSelection" component={CharacterSelectionScreen} />
    <RootStack.Screen name="Profile" component={ProfileScreen} />
  </RootStack.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

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

export default App;