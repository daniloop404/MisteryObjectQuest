import { words as commonWords } from '../constants/words';

class GameService {

  getRandomWord(character: any, usedWords: string[]): string {
    const combinedWords = [
      ...commonWords.common,
      ...character.specificWords,
    ];

    let randomWord: string;
    do {
      randomWord = combinedWords[Math.floor(Math.random() * combinedWords.length)];
    } while (usedWords.includes(randomWord));

    return randomWord;
  }
}

export default new GameService();