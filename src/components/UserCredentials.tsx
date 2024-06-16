import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { updateUserProfileField, updateUsername } from '../services/profileService';
import { FontAwesome } from '@expo/vector-icons';

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
      await updateUsername(newUsername);
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
    <View style={styles.container}>
      <Text style={styles.title}>Información del Usuario</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre de usuario:</Text>
        {isEditingUsername ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newUsername}
              onChangeText={setNewUsername}
              multiline={false}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C44E4E',
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
  },
  editIconContainer: {
    backgroundColor: '#C44E4E',
    borderRadius: 15,
    padding: 5,
    marginLeft: 10,
  },
  editIcon: {
    marginHorizontal: 5,
  },
});

export default UserCredentials;