import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CharacterInfo } from '../../services/characterService';
import { useGameContext } from '../../context/GameContext';

interface CharacterPortraitProps {
  character: CharacterInfo;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ character }) => {
  const { phase } = useGameContext();
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getRandomImage = (images: (string | undefined)[]) => {
      const validImages = images.filter(image => image !== undefined) as string[];
      const randomIndex = Math.floor(Math.random() * validImages.length);
      return validImages[randomIndex];
    };

    let imageToShow: string | undefined; 

    setIsLoading(true); 

    if (phase === 'loading' && character.loadingImage) {
      imageToShow = character.loadingImage;
    } else if (phase === 'greeting') {
      imageToShow = getRandomImage([
        character.game_expressions?.greeting1, 
        character.game_expressions?.greeting2
      ]);
      setIsLoading(false);
    } else if (phase === 'guessing') {
      imageToShow = getRandomImage([
        character.game_expressions?.guessing1, 
        character.game_expressions?.guessing2
      ]);
      setIsLoading(false);
    } else if (phase === 'failure') { 
      imageToShow = getRandomImage([
        character.game_expressions?.guessing1,
        character.game_expressions?.guessing2,
        character.game_expressions?.incorrect1,
        character.game_expressions?.incorrect2
      ]);
      setIsLoading(false);
    } else if (phase === 'success') { 
      imageToShow = getRandomImage([
        character.game_expressions?.correct1,
        character.game_expressions?.correct2,
      ]);
      setIsLoading(false);
    } else if (phase === 'checking') { 
      imageToShow = character.loadingImage;
      setIsLoading(true);
    } else if (phase === 'farewell') {
      imageToShow = getRandomImage([
        character.game_expressions?.goodbye1,
        character.game_expressions?.goodbye2
      ]);
      setIsLoading(false);
    } else {
      imageToShow = character.image;
      setIsLoading(false);
    }

    setCurrentImage(imageToShow);

  }, [phase, character]);

  return (
    <View style={styles.container}>
      {isLoading && <Image source={{ uri: character.loadingImage }} style={styles.characterImage} />} 
      {!isLoading && <Image source={{ uri: currentImage }} style={styles.characterImage} />}
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