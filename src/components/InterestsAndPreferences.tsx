import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { updateUserProfilePreferences } from '../services/profileService'; // Importa la nueva función
import { FontAwesome } from '@expo/vector-icons';

interface InterestsAndPreferencesProps {
  interesesYPreferencias: {
    hobbies: string;
    generosFavoritos: string;
    musicaFavorita: string;
    colorFavorito: string;
    actividadesFavoritas: string;
  };
}

const InterestsAndPreferences: React.FC<InterestsAndPreferencesProps> = ({ interesesYPreferencias }) => {
  const [isEditing, setIsEditing] = useState({
    hobbies: false,
    generosFavoritos: false,
    musicaFavorita: false,
    colorFavorito: false,
    actividadesFavoritas: false,
  });
  const [editedPreferences, setEditedPreferences] = useState({ ...interesesYPreferencias });
  const [originalPreferences, setOriginalPreferences] = useState({ ...interesesYPreferencias }); // Nuevo estado
  
  const handleEditField = (field: keyof InterestsAndPreferencesProps['interesesYPreferencias']) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setOriginalPreferences((prev) => ({ ...prev, [field]: editedPreferences[field] })); // Guardar valor original
  };

  const handleConfirmEdit = async (field: keyof InterestsAndPreferencesProps['interesesYPreferencias']) => {
    try {
      await updateUserProfilePreferences(field, editedPreferences[field]);
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          // Manejar otro tipo de error
          console.error('Error desconocido:', error);
        }
      }
  };

  const handleCancelEdit = (field: keyof InterestsAndPreferencesProps['interesesYPreferencias']) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    setEditedPreferences((prev) => ({ ...prev, [field]: originalPreferences[field] })); // Usar valor original
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.subtitle}>Intereses y Preferencias</Text>
      {Object.entries(editedPreferences).map(([field, value]) => (
        <View key={field} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}:</Text>
          {isEditing[field as keyof InterestsAndPreferencesProps['interesesYPreferencias']] ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => setEditedPreferences((prev) => ({ ...prev, [field]: text }))}
              />
              <TouchableOpacity onPress={() => handleConfirmEdit(field as keyof InterestsAndPreferencesProps['interesesYPreferencias'])} style={styles.editIconContainer}>
                <FontAwesome name="check" size={20} color="white" style={styles.editIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancelEdit(field as keyof InterestsAndPreferencesProps['interesesYPreferencias'])} style={styles.editIconContainer}>
                <FontAwesome name="times" size={20} color="white" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{value}</Text>
              <TouchableOpacity onPress={() => handleEditField(field as keyof InterestsAndPreferencesProps['interesesYPreferencias'])} style={styles.editIconContainer}>
                <FontAwesome name="pencil" size={20} color="white" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    infoContainer: {
      marginBottom: 20,
      width: '100%',
    },
    subtitle: {
      fontSize: 24,
      color: '#C44E4E',
      fontFamily: 'Asquire',
      marginBottom: 10,
    },
    fieldContainer: {
      marginBottom: 10,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      alignSelf: 'flex-start',
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    value: {
      fontSize: 16,
      marginBottom: 10,
      alignSelf: 'flex-start',
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
    },
    editIconContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 15,
      padding: 5,
      marginLeft: 10,
    },
    editIcon: {
      marginHorizontal: 5,
    },
  });

export default InterestsAndPreferences;