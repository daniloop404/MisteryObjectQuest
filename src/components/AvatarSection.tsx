import React from 'react';
import { View, Image, TouchableOpacity, Button, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

interface AvatarSectionProps {
  userInfo: any;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  userInfo,
  selectedImage,
  setSelectedImage,
  handleConfirm,
  handleCancel,
}) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('¡Lo siento, necesitamos permisos para acceder a la galería de fotos para que esto funcione!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('¡Lo siento, necesitamos permisos para acceder a la cámara para que esto funcione!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.title}>Avatar</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: selectedImage || userInfo.avatar }}
          style={styles.profileImage}
        />
        {!selectedImage && (
          <View style={styles.cameraIconContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.icon}>
              <FontAwesome name="photo" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {!selectedImage && (
          <View style={styles.cameraIconContainer2}>
            <TouchableOpacity onPress={takePhoto} style={styles.icon}>
              <FontAwesome name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {selectedImage && (
        <View style={styles.buttonContainer}>
          <Button title="Confirmar" onPress={handleConfirm} />
          <Button title="Cancelar" onPress={handleCancel} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#C44E4E',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#C44E4E',
    borderRadius: 15,
    padding: 5,
  },
  cameraIconContainer2: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#C44E4E',
    borderRadius: 15,
    padding: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});

export default AvatarSection;