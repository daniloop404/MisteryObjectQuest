import { firebase } from '../constants/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

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

export const updateUserProfileImage = async (imageUri: string, userId: string): Promise<string> => {
    try {
      // Obtener referencia a la ubicación donde se almacenará la imagen en Firebase Storage
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = firebase.storage().ref().child(`avatars/${userId}`);
  
      // Subir la nueva imagen
      await storageRef.put(blob);
  
      // Obtener la URL de descarga de la nueva imagen
      const downloadURL = await storageRef.getDownloadURL();
  
      // Actualizar la URL de la imagen en el perfil del usuario en Firebase Realtime Database
      await firebase.database().ref(`usuarios/${userId}`).update({ avatar: downloadURL });
  
      return downloadURL;
    } catch (error) {
      console.error('Error al actualizar la imagen de perfil:', error);
      throw error;
    }
  };