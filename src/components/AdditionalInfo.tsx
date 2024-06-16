import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { updateUserProfileField } from '../services/profileService';
import { FontAwesome } from '@expo/vector-icons';

interface AdditionalInfoProps {
  informacionAdicional: {
    nombreReal: string;
    edad: string;
    genero: string;
  };
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ informacionAdicional }) => {
  const [isEditing, setIsEditing] = useState({
    nombreReal: false,
    edad: false,
    genero: false,
  });
  const [editedInfo, setEditedInfo] = useState({ ...informacionAdicional });
  const [originalInfo, setOriginalInfo] = useState({ ...informacionAdicional });

  const handleEditField = (field: keyof AdditionalInfoProps['informacionAdicional']) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setOriginalInfo((prev) => ({ ...prev, [field]: editedInfo[field] }));
  };

  const handleConfirmEdit = async (field: keyof AdditionalInfoProps['informacionAdicional']) => {
    try {
      await updateUserProfileField(field, editedInfo[field]);
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };

  const handleCancelEdit = (field: keyof AdditionalInfoProps['informacionAdicional']) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    setEditedInfo((prev) => ({ ...prev, [field]: originalInfo[field] }));
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.subtitle}>Información Adicional</Text>
      {Object.entries(editedInfo).map(([field, value]) => (
        <View key={field} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}:</Text>
          {isEditing[field as keyof AdditionalInfoProps['informacionAdicional']] ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => setEditedInfo((prev) => ({ ...prev, [field]: text }))}
              />
              <TouchableOpacity onPress={() => handleConfirmEdit(field as keyof AdditionalInfoProps['informacionAdicional'])} style={styles.editIconContainer}>
                <FontAwesome name="check" size={20} color="white" style={styles.editIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancelEdit(field as keyof AdditionalInfoProps['informacionAdicional'])} style={styles.editIconContainer}>
                <FontAwesome name="times" size={20} color="white" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{value}</Text>
              <TouchableOpacity onPress={() => handleEditField(field as keyof AdditionalInfoProps['informacionAdicional'])} style={styles.editIconContainer}>
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
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C44E4E',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 10,
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

export default AdditionalInfo;