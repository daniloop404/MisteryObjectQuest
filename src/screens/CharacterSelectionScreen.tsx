import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { CharacterInfo, getCharacters } from '../services/characterService';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../constants/types';

const { width, height } = Dimensions.get('window');

type CharacterSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CharacterSelection'>;

const CharacterSelectionScreen: React.FC = () => {
  const [chars, setChars] = useState<CharacterInfo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<CharacterSelectionScreenNavigationProp>();

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getCharacters();
      setChars(characters);
      setIsLoading(false);
    };

    fetchCharacters();
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex < chars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('../../assets/splash.png')} style={styles.splashImage} />
      </View>
    );
  }

  const currentChar = chars[currentIndex];

  return (
    <ImageBackground source={{ uri: currentChar.image }} style={styles.container} resizeMode="cover">
      <View style={styles.overlay} />
      <Text style={styles.title}>Selecciona el personaje</Text>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const newIndex = Math.floor(offsetX / width);
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {chars.map((char, index) => (
          <View key={index} style={styles.characterContainer}>
            <View style={styles.innerContainer}>
              <Text style={[styles.name, { color: char.color }]}>{char.name}</Text>
              <Image source={{ uri: char.image }} style={styles.characterImage} />
              <Text style={styles.description}>{char.description}</Text>
              <TouchableOpacity
                style={[styles.chooseButton, { backgroundColor: char.color }]}
                onPress={() => navigation.navigate('GameScreen', { character: char })}
              >
                <Text style={styles.buttonText}>Elegir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => handleSwipe('right')} disabled={currentIndex === 0}>
          <FontAwesome name="arrow-left" size={40} color={'#fff'} style={styles.iconShadow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('GameMenu')}>
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSwipe('left')} disabled={currentIndex === chars.length - 1}>
          <FontAwesome name="arrow-right" size={40} color={'#fff'} style={styles.iconShadow} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 30,
    marginTop: 40,
    marginBottom: 20,
    color: '#FFF',
    fontFamily: 'Dino',
  },
  characterContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  characterImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  name: {
    fontSize: 28,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Dino',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: 'Light',
  },
  chooseButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  iconShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#C44E4E',
    padding: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default CharacterSelectionScreen;