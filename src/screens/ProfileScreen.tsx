import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  ScrollView, 
  Image,
} from 'react-native';
import { getUserProfile, updateUserProfileImage } from '../services/profileService';
import AvatarSection from '../components/AvatarSection'; 
import UserCredentials from '../components/UserCredentials'; 
import AdditionalInfo from '../components/AdditionalInfo';
import InterestsAndPreferences from '../components/InterestsAndPreferences';
import HighScores from '../components/HighScores'; // Importar el componente HighScores

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
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ width: '100%' }}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.subtitle}>Perfil</Text>
          </View>
          <AvatarSection
            userInfo={userInfo}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
          />

          <UserCredentials username={userInfo.username} email={userInfo.email} />

          <AdditionalInfo informacionAdicional={userInfo.informacionAdicional} />

          <InterestsAndPreferences interesesYPreferencias={userInfo.interesesYPreferencias} />

          {userInfo.highScores && userInfo.highScores.length > 0 && (
            <HighScores highScores={userInfo.highScores} />
          )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    paddingVertical: 32,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#C44E4ECC',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 0,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 42,
    color: '#FFFFFF',
    fontFamily: 'Dino',
    marginTop: 0,
    textAlign: 'center',
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
    paddingBottom: 32, 
  },
});

export default ProfileScreen;