import { firebase } from '../constants/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface UserInfo { // Agrega "export" aquí
  uid: string;
  username: string;
  email: string;
  avatar?: string;
  informacionAdicional: {
    edad?: string;
    genero?: string;
    nombreReal?: string;
  };
  interesesYPreferencias: {
    actividadesFavoritas?: string;
    colorFavorito?: string;
    generosFavoritos?: string;
    hobbies?: string;
    musicaFavorita?: string;
  };
}
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
  export const updateUsername = async (newUsername: string): Promise<void> => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User not logged in');
      }
  
      // Obtener el nombre de usuario actual
      const userSnapshot = await firebase.database().ref(`usuarios/${userToken}`).once('value');
      const currentUsername = userSnapshot.val().username;
  
      // Verificar si el nuevo nombre de usuario ya está en uso, 
      // solo si es diferente al nombre de usuario actual
      if (newUsername !== currentUsername) { 
        const usersSnapshot = await firebase.database().ref('usuarios').orderByChild('username').equalTo(newUsername).once('value');
        if (usersSnapshot.exists()) {
          throw new Error('El nombre de usuario ya está en uso. Por favor, elige otro.');
        }
      }
  
      // Actualizar el nombre de usuario directamente en el usuario
      await firebase.database().ref(`usuarios/${userToken}`).update({ username: newUsername }); 
  
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario:', error);
      throw error;
    }
  };
  export const updateUserProfileField = async (field: string, newValue: string): Promise<void> => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User not logged in');
      }
  
      // Verificar si el nuevo nombre de usuario ya está en uso (opcional, solo para "username")
      if (field === 'username') {
        const usersSnapshot = await firebase.database().ref('usuarios').orderByChild(field).equalTo(newValue).once('value');
        if (usersSnapshot.exists()) {
          throw new Error(`El ${field} '${newValue}' ya está en uso. Por favor, elige otro.`);
        }
      }
  
      // Actualizar el campo dentro de "informacionAdicional"
      await firebase.database().ref(`usuarios/${userToken}/informacionAdicional`).update({ [field]: newValue }); 
  
    } catch (error) {
      console.error(`Error al actualizar el ${field} del perfil:`, error);
      throw error;
    }
    
  };
  export const updateUserProfilePreferences = async (
    field: string,
    newValue: string
  ): Promise<void> => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User not logged in');
      }
  
      // Actualizar el campo dentro de "interesesYPreferencias"
      await firebase
        .database()
        .ref(`usuarios/${userToken}/interesesYPreferencias`)
        .update({ [field]: newValue });
    } catch (error) {
      console.error(`Error al actualizar el ${field} del perfil:`, error);
      throw error;
    }
  };