import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HighScoresProps {
  highScores: {
    characterName: string;
    score: number;
    image: string;
    color: string;
  }[];
}

const HighScores: React.FC<HighScoresProps> = ({ highScores }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntajes Máximos</Text>
      {highScores.map((highScore, index) => (
        <View key={index} style={[styles.scoreContainer, { borderColor: highScore.color }]}>
          <Image source={{ uri: highScore.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={[styles.characterName, { color: highScore.color }]}>{highScore.characterName}</Text>
            <Text style={styles.score}>Puntaje: {highScore.score}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C44E4E',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
  },
});

export default HighScores;