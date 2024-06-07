import React from 'react';
import { View, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
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
      alert('Sorry, we need camera roll permissions to make this work!');
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
      alert('Sorry, we need camera permissions to make this work!');
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
    <View style={styles.imageContainer}>
      <View style={styles.imageWrapper}>
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
      </View>
      {!selectedImage && (
        <View style={styles.cameraIconContainer2}>
          <TouchableOpacity onPress={takePhoto} style={styles.icon}>
            <FontAwesome name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
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
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  cameraIconContainer2: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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