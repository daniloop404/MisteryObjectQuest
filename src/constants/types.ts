import { Character } from '../services/characterService';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  GameScreen: { character: Character };
  GameMenu: undefined;
  AuthStack: undefined;
  GameStack: undefined;
  CharacterSelection: undefined;
  Profile: undefined;
};