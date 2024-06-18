import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, FlatList } from 'react-native';
import { HighScore, getLeaderboard } from '../services/LeaderboardService';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../constants/types';

const { width, height } = Dimensions.get('window');

type LeaderboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Leaderboard'>;

const LeaderboardScreen: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<{ [key: string]: HighScore[] }>({});
  const [currentCharacter, setCurrentCharacter] = useState<string | null>(null);
  const [characters, setCharacters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<LeaderboardScreenNavigationProp>();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardData = await getLeaderboard();
      setLeaderboard(leaderboardData);
      const characterNames = Object.keys(leaderboardData);
      setCharacters(characterNames);
      setCurrentCharacter(characterNames[0] || null);
      setIsLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentIndex = characters.indexOf(currentCharacter!);
    if (direction === 'left') {
      setCurrentCharacter(characters[(currentIndex + 1) % characters.length]);
    } else if (direction === 'right') {
      setCurrentCharacter(characters[(currentIndex - 1 + characters.length) % characters.length]);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('../../assets/splash.png')} style={styles.splashImage} />
      </View>
    );
  }

  return (
    <ImageBackground source={currentCharacter ? { uri: leaderboard[currentCharacter][0].image } : require('../../assets/splash.png')} style={styles.container} resizeMode="cover">
      <View style={styles.overlay} />
      <Text style={styles.title}>Tabla de clasificación</Text>
      <View style={styles.characterInfoContainer}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: leaderboard[currentCharacter!][0].color }]}>
            {currentCharacter}
          </Text>
        </View>
      </View>
      <FlatList
        data={leaderboard[currentCharacter!]}
        keyExtractor={(item) => item.username}
        renderItem={({ item, index }) => (
          <View style={styles.scoreContainer}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => handleSwipe('right')}>
          <FontAwesome name="arrow-left" size={40} color={'#fff'} style={styles.iconShadow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('GameMenu')}>
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSwipe('left')}>
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
  characterInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Dino',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  rank: {
    fontSize: 18,
    fontFamily: 'Asquire',
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Asquire',
    flex: 1,
  },
  score: {
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asquire',
  },
});

export default LeaderboardScreen;