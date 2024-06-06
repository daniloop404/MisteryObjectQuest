import { firebase } from '../constants/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserProfile = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      throw new Error('User not logged in');
    }

    const userSnapshot = await firebase.database().ref(`usuarios/${userToken}`).once('value');
    const userProfile = userSnapshot.val();

    if (userProfile) {
      return userProfile; // Retornar el perfil completo
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    throw error;
  }
};