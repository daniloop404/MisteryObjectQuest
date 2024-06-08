import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Character } from '../../services/characterService';

interface CharacterPortraitProps {
  character: Character;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ character }) => {
  const { game_expressions } = character;

  return (
    <View style={styles.container}>
      {game_expressions && game_expressions.greeting1 ? (
        <Image source={{ uri: character.loadingImage }} style={styles.characterImage} />
      ) : (
        <Image source={{ uri: character.image }} style={styles.characterImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  characterImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default CharacterPortrait;