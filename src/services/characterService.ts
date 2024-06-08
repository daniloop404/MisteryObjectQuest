import { firebase } from "../constants/firebaseConfig";

export interface Character {
  name: string;
  image: string;
  description: string;
  color: string;
  age?: number;
  appearance?: string;
  attire?: string;
  backstory?: {
    career: string;
    discovery: string;
    earlyLife: string;
    oliver: string;
    secret: string;
  };
  dialogues?: {
    farewells: string[];
    greetings: string[];
    phrases: string[];
    specificPhrases: string[];
  };
  expressions?: {
    [key: string]: string;
  };
  game_expressions?: {
    [key: string]: string;
  };
  loadingImage?: string;
  personality?: {
    compassionate: string;
    intelligent: string;
    isolated: string;
  };
  relationships?: {
    oliver: string;
    world: string;
  };
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
        age: character.age,
        appearance: character.appearance,
        attire: character.attire,
        backstory: character.backstory,
        dialogues: character.dialogues,
        expressions: character.expressions,
        game_expressions: character.game_expressions,
        loadingImage: character.loadingImage,
        personality: character.personality,
        relationships: character.relationships,
      });
    });
  }

  return characters;
};