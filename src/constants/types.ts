import { CharacterInfo } from '../services/characterService';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  GameScreen: { character: CharacterInfo };
  GameMenu: undefined;
  AuthStack: undefined;
  GameStack: undefined;
  CharacterSelection: undefined;
  Profile: undefined;
};