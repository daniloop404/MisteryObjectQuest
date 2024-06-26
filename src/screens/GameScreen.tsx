import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import CharacterPortrait from '../components/game/CharacterPortrait';
import CharacterSpeech from '../components/game/CharacterSpeech';
import GameStats from '../components/game/GameStats';
import PlayerResponse from '../components/game/PlayerResponse';
import GameProvider, { useGameContext } from '../context/GameContext'; 
import { getUserProfile, UserInfo } from '../services/profileService';
import CustomModal from '../components/CustomModal';
type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserInfo | null>(null);
  const route = useRoute<GameScreenRouteProp>();
  const { character } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const StartGameComponent = () => {
    const { startGreeting } = useGameContext(); // Ahora puedes usar useGameContext() aquí

    useEffect(() => {
      startGreeting(); // Iniciar el juego al montar este componente
    }, []); 

    return null; // Este componente no renderiza nada, solo inicia el juego
  };
  const handleNavigateToCharacterSelection = () => {
    navigation.navigate('CharacterSelection');
    };
  const GameContent = () => {
    const { error, clearError, startGreeting } = useGameContext();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      startGreeting(); 
    }, []);

    useEffect(() => {
      if (error) {
        setErrorMessage(error);
        setShowErrorModal(true);
      }
    }, [error]);

    const handleCloseErrorModal = () => {
      setShowErrorModal(false);
      clearError(); 
    };

    return (
      <>
        {/* Resto de tu contenido dentro de GameScreen: */}
        <ImageBackground
          // ...
        >
          {/* ... */}
          <CustomModal
            visible={showErrorModal}
            message={errorMessage}
            onClose={handleCloseErrorModal}
            onModalClose={handleNavigateToCharacterSelection}
          />
        </ImageBackground>
      </>
    );
  };

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
      setIsLoading(false);
    };
    loadCharacter();
  }, []);

  const handleLogout = () => {
    navigation.navigate('CharacterSelection');
  };

  const handleInstructions = () => {
    // lógica para mostrar las instrucciones
  };

  if (isLoading || !userProfile) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('../../assets/splash.png')} style={styles.splashImage} />
      </View>
    );
  }

  return (
    <GameProvider character={character} user={userProfile} navigation={navigation}>
      {!isLoading && <StartGameComponent /> && <GameContent />}
      <ImageBackground
        source={{ uri: character.image }}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={[styles.characterName, { color: character.color }]}>{character.name}</Text>
            <CharacterPortrait character={character} />
            <CharacterSpeech character={character} />
            <View style={styles.divider} />
            <GameStats userProfile={userProfile} />
            <PlayerResponse characterColor={character.color} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.instructionsButton]} onPress={handleInstructions}>
                <Text style={styles.buttonText}>Instrucciones</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </GameProvider>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  characterName: {
    fontSize: 40,
    color: '#1B2353',
    fontFamily: 'Dino',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#1B2353',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  instructionsButton: {
    backgroundColor: '#D48236',
    width: '58%',
    marginRight: '4%',
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: '#C44E4E',
    width: '38%',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire',
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
});

export default GameScreen;