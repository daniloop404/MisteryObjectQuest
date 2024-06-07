import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { updateUserProfileField } from '../services/profileService';
import { FontAwesome } from '@expo/vector-icons';
import { updateUsername } from '../services/profileService';
interface UserCredentialsProps {
  username: string;
  email: string;
}

const UserCredentials: React.FC<UserCredentialsProps> = ({ username, email }) => {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [originalUsername, setOriginalUsername] = useState(username);

  const handleEditUsername = () => {
    setIsEditingUsername(true);
    setOriginalUsername(newUsername);
  };

  const handleConfirmUsernameChange = async () => {
    try {
      await updateUsername(newUsername); // Usar la nueva función
      setIsEditingUsername(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };

  const handleCancelUsernameChange = () => {
    setIsEditingUsername(false);
    setNewUsername(originalUsername);
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>Nombre de usuario:</Text>
      {isEditingUsername ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newUsername}
            onChangeText={setNewUsername}
            multiline={false} // Para que el input no se expanda en múltiples líneas
          />
          <TouchableOpacity onPress={handleConfirmUsernameChange} style={styles.editIconContainer}>
            <FontAwesome name="check" size={20} color="white" style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelUsernameChange} style={styles.editIconContainer}>
            <FontAwesome name="times" size={20} color="white" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{newUsername}</Text>
          <TouchableOpacity onPress={handleEditUsername} style={styles.editIconContainer}>
            <FontAwesome name="pencil" size={20} color="white" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.value}>{email}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start', // Alinea el texto a la izquierda
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start', // Alinea el texto a la izquierda
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  editIconContainer: { // Nuevo contenedor para el icono
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
    marginLeft: 10,
  },
  editIcon: {
    marginHorizontal: 5, // Ajusta el espacio dentro del icono
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginRight: 10,
  }, 
});

export default UserCredentials;