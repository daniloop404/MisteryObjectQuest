import { firebase } from "../constants/firebaseConfig";

export interface Character {
  name: string;
  image: string;
  description: string;
  color: string;
}

export const getCharacters = async (): Promise<Character[]> => {
  const snapshot = await firebase.database().ref('characters').once('value');
  const charactersData = snapshot.val();
  const characters: Character[] = [];

  if (charactersData) {
    Object.keys(charactersData).forEach((key) => {
      const character = charactersData[key];
      characters.push({
        name: character.name,
        image: character.image,
        description: character.description,
        color: character.color,
      });
    });
  }

  return characters;
};