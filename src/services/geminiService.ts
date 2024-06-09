import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyB5VQE7sLm9a18T0UWsiNifhljhqFJ4s5c"; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    Tu tomarás el rol del personaje en un roleplay de un juego de adivinar palabras a partir de una descripción. 
    Toma en cuenta la palabra dada, la información del personaje, la información del usuario y habla como hablaría el personaje.

    La salida dependerá de la fase del juego que son:
    - 'greeting': Aquí se presentará el personaje al jugador.
    - 'guessing': Esta es la parte del juego donde como salida darás una descripción corta y vaga de la palabra a adivinar, y una pista con información adicional. 
        Ejemplo de salida:
        objeto: Guitarra electrica (en este caso relacionado con el gusto del usuario con el rock)
        descripcion: Daniel, veo que eres un amante de la música, y tengo una pregunta para ti. ¿Qué te parece una herramienta que produce sonidos mágicos, vibrante y llena de energía, que puede hacerte volar con su ritmo y que se usa en casi todas las canciones que escuchas en la radio?
        pista: Es algo que se toca con las manos, y que a veces se conecta con un amplificador para que suene más fuerte. ¡Piensa en las canciones que te gustan, en las bandas que te emocionan y en el sonido que te hace vibrar! ¿Sabes de qué estoy hablando?
    - 'checking': En esta fase determinarás si la palabra ingresada fue correcta o incorrecta, en el json pondrás "correct" o "incorrect" en "guess".
    - 'success': En esta fase se felicitará al usuario por adivinar la palabra.
    - 'failure': En esta fase se le hará saber al usuario que la palabra que eligió no es correcta. Aquí también se le proporcionará una nueva pista.
    - 'farewell': En esta fase el personaje se despedirá del jugador ya que este agotó sus vidas o intentos.

    Recuerda que la salida debe tener la personalidad del personaje en la forma de hablar, incluye el nombre del usuario cuando hables, si este tiene nombre real usa el nombre real si este no tiene el nombre real usa el username. 
    Usa también la información adicional del usuario si está relacionado con la palabra a adivinar o en otras fases si consideras pertinente. 
    Recuerda que lo más importante es que la salida de cada fase refleje la personalidad del personaje. 
    No incluyas emojis. 
    Entre más puntaje (currentscore) tenga el usuario más difícil será adivinar con la descripción más ambigua siendo un score de 10 muy alto.

    Devuelve la salida en un arreglo json.
    [
        {
            "output": "",
            "clue": "",  // "solo en la fase de guessing y failure"
            "guess": ""  // "correct" o "incorrect" en la fase 'checking'
        }
    ]
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export interface CharacterInfo {
  name: string;
  image: string;
  loadingImage: string;
  description: string;
  personality: {
    intelligent: string;
    isolated: string;
    compassionate: string;
  };
  appearance: string;
  attire: string;
  color: string;
  age: number;
  backstory: {
    earlyLife: string;
    discovery: string;
    oliver: string;
    career: string;
    secret: string;
  };
  relationships: {
    oliver: string;
    world: string;
  };
  dialogues: {
    greetings: string[];
    farewells: string[];
    phrases: string[];
    specificPhrases: string[];
  };
}

export interface UserInfo {
  edad: string;
  email: string;
  informacionAdicional: {
    edad: string;
    genero: string;
    nombreReal: string;
  };
  interesesYPreferencias: {
    actividadesFavoritas: string;
    colorFavorito: string;
    generosFavoritos: string;
    hobbies: string;
    musicaFavorita: string;
  };
  username: string;
}

interface GameInfo {
  currentPhase: string;
  currentscore: number; 
  maxscore: number;
  currentword: string;
  lives: number;
  timeleft: number;
  userword: string;
}

export class GeminiService {
  private chatSession: any;

  constructor(
    private character: CharacterInfo,
    private user: UserInfo,
    private game: GameInfo
  ) {}

  async startChat() {
    this.chatSession = await model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Información del personaje: ${JSON.stringify(this.character)}\nInformación del usuario: ${JSON.stringify(this.user)}\n{"gamestats": ${JSON.stringify(this.game)}}`, 
            },
          ],
        },
      ],
    });
  }

  async sendMessage(message: string): Promise<any> {
    const result = await this.chatSession.sendMessage(message);
    return JSON.parse(result.response.text());
  }
}