import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import Icon from 'react-native-vector-icons/FontAwesome';

interface GameStatsProps {
  userProfile: {
    username: string;
    avatar: string | null;
  };
}

const GameStats: React.FC<GameStatsProps> = ({ userProfile }) => {
  const { lives, score, timeRemaining } = useGameContext();

  const formattedTime = `${Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`;

  const renderLives = () => {
    let hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(
        <View key={i} style={styles.heartIconContainer}>
          <Icon name="heart" size={24} color="red" style={styles.heartIcon} />
        </View>
      );
    }
    return hearts;
  };

  return (
    <View style={styles.container}>
      <View style={styles.livesContainer}>
        {userProfile.avatar && (
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          </View>
        )}
        <Text style={styles.livesText}>
          <Text style={styles.boldText}>{userProfile.username}:</Text>
        </Text>
        <View style={styles.heartsContainer}>
          {renderLives()}
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          <Text style={styles.boldText}>Puntuación:</Text> {score}
        </Text>
        <Text style={styles.timeText}>
          <Text style={styles.boldText}>Tiempo:</Text> {formattedTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    width: '100%',
  },
  avatarContainer: {
    width: 54, // Tamaño mayor para incluir la sombra
    height: 54,
    borderRadius: 27,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hacer la imagen circular
    borderWidth: 2, // Agregar un contorno a la imagen
    borderColor: 'gray',
  },
  livesText: {
    fontSize: 22,
    marginRight: 15, // Espacio adicional entre el nombre de usuario y los iconos
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  heartsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIconContainer: {
    marginHorizontal: 6, // Espacio adicional entre los iconos
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  heartIcon: {
    // Estilos específicos del icono, si es necesario
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 20,
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  timeText: {
    fontSize: 20,
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default GameStats;