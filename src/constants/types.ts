export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  GameScreen: undefined;
  GameMenu: undefined;
  Auth: undefined;
  Game: undefined;
  CharacterSelection: undefined;
  AdditionalInfo: { userId: string };
  Preferences: { userId: string, realName: string, age: string, gender: string };
  ProfileImage: { userId: string, realName?: string, age?: string, gender?: string, hobbies?: string, favoriteGenres?: string, favoriteMusic?: string, favoriteColor?: string, favoriteActivities?: string };
};