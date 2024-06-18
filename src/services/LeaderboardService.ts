import { firebase } from '../constants/firebaseConfig';

export interface HighScore {
  characterName: string;
  score: number;
  username: string;
  image: string;
  color: string;
}

export const getLeaderboard = async (): Promise<{ [key: string]: HighScore[] }> => {
  try {
    const usersSnapshot = await firebase.database().ref('usuarios').once('value');
    const usersData = usersSnapshot.val();
    
    if (!usersData) {
      throw new Error('No users found');
    }

    const allHighScores: HighScore[] = [];
    
    Object.values(usersData).forEach((user: any) => {
      const highScores = user.highScores || [];
      highScores.forEach((scoreEntry: any) => {
        allHighScores.push({
          characterName: scoreEntry.characterName,
          score: scoreEntry.score,
          username: user.username,
          image: scoreEntry.image,
          color: scoreEntry.color,
        });
      });
    });

    // Agrupar por personaje y obtener el top 5
    const scoresByCharacter = allHighScores.reduce((acc, score) => {
      if (!acc[score.characterName]) {
        acc[score.characterName] = [];
      }
      acc[score.characterName].push(score);
      return acc;
    }, {} as { [key: string]: HighScore[] });

    const top5ByCharacter = Object.keys(scoresByCharacter).reduce((acc, characterName) => {
      acc[characterName] = scoresByCharacter[characterName]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      return acc;
    }, {} as { [key: string]: HighScore[] });

    return top5ByCharacter;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};