import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image,
  ScrollView, 
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Modal
} from 'react-native';
import { getUserProfile, updateUserProfileImage } from '../services/profileService';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      setUserInfo(profile);
      setIsLoading(false);
    };

    fetchUserProfile();
  }, []);

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

  const handleConfirm = async () => {
    if (selectedImage && userInfo) {
      setIsUploading(true);
      try {
        const downloadURL = await updateUserProfileImage(selectedImage, userInfo.uid);
        setUserInfo({ ...userInfo, avatar: downloadURL });
        setSelectedImage(null);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
  };

  if (isLoading || isUploading) {
    return (
        <View style={styles.splashContainer}>
        <Image source={require('../../assets/splash.png')} style={styles.splashImage} />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar el perfil</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/backgrounds/backgroundHome.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContent}> 
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Perfil</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage || userInfo.avatar }}
              style={styles.profileImage}
            />
            <View style={styles.cameraIconContainer}>
              <TouchableOpacity onPress={pickImage}>
                <FontAwesome name="photo" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={{ marginTop: 10 }}>
                <FontAwesome name="camera" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {selectedImage && (
            <View style={styles.buttonContainer}>
              <Button title="Confirmar" onPress={handleConfirm} />
              <Button title="Cancelar" onPress={handleCancel} />
            </View>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nombre de usuario:</Text>
            <Text style={styles.value}>{userInfo.username}</Text>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.value}>{userInfo.email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.subtitle}>Información Adicional</Text>
            <Text style={styles.label}>Nombre Real:</Text>
            <Text style={styles.value}>{userInfo.informacionAdicional.nombreReal}</Text>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}>{userInfo.informacionAdicional.edad}</Text>
            <Text style={styles.label}>Género:</Text>
            <Text style={styles.value}>{userInfo.informacionAdicional.genero}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.subtitle}>Intereses y Preferencias</Text>
            <Text style={styles.label}>Hobbies:</Text>
            <Text style={styles.value}>{userInfo.interesesYPreferencias.hobbies}</Text>
            <Text style={styles.label}>Géneros de Películas/Libros Favoritos:</Text>
            <Text style={styles.value}>{userInfo.interesesYPreferencias.generosFavoritos}</Text>
            <Text style={styles.label}>Música Favorita:</Text>
            <Text style={styles.value}>{userInfo.interesesYPreferencias.musicaFavorita}</Text>
            <Text style={styles.label}>Color Favorito:</Text>
            <Text style={styles.value}>{userInfo.interesesYPreferencias.colorFavorito}</Text>
            <Text style={styles.label}>Actividades Favoritas:</Text>
            <Text style={styles.value}>{userInfo.interesesYPreferencias.actividadesFavoritas}</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 32,
    borderRadius: 20,
    width: '95%',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#C44E4E',
    fontFamily: 'Dino',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
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
  infoContainer: {
    marginBottom: 20,
    width: '100%',
  },
  subtitle: {
    fontSize: 24,
    color: '#C44E4E',
    fontFamily: 'Dino',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', 
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32, // Añade padding al contenido para evitar que quede pegado a los bordes
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  
});

export default ProfileScreen;