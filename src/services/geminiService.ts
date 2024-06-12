import { GEMINI_API_KEY } from '@env';

// Importa tus servicios y otras dependencias
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { UserInfo } from '../services/profileService'; // Importa las interfaces correctamente
import { CharacterInfo } from '../services/characterService';

// Obtén la clave API desde las variables de entorno y verifica que no sea undefined
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("La clave API de Gemini no está definida. Por favor, configura la variable de entorno GEMINI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    Tu tomarás el rol del personaje en un roleplay de un juego de adivinar palabras a partir de una descripción, el juego continua mientras el jugador tenga (lives). 
    Toma en cuenta la palabra dada, la información del personaje, la información del usuario y habla como hablaría el personaje.
    "Los diálogos en 'Character' son solo ejemplos. No los repitas. Debes generar respuestas únicas y originales que se ajusten a la personalidad de Victoria, la hora del día (currentTime) y la información del usuario y gamestats"
    Lo mas Importante es
    La salida dependerá de la fase del juego que son:
    - 'greeting': En esta fase te presentaras al jugador. IMPORTANTE Presta mucha atención a la hora del día (currentTime) para elegir el saludo apropiado. Por ejemplo, si currentTime es '08:00 AM', debes usar un saludo de buenos días. No digas 'buenas noches' si es de día..
    - 'guessing': Esta es la parte del juego donde como salida darás una descripción corta y vaga de la palabra a adivinar.
        Ejemplo de salida(esto es solo un ejemplo, la palabra que debes describir es la que esta en currentword):
        objeto: Guitarra electrica (en este caso relacionado con el gusto del usuario con el rock)
        descripcion: Daniel, veo que eres un amante de la música, y tengo una pregunta para ti(en este caso la palabra esta relacionada con la informacion del usuario). ¿Qué te parece una herramienta que produce sonidos mágicos, vibrante y llena de energía, que puede hacerte volar con su ritmo y que se usa en casi todas las canciones que escuchas en la radio?
    - 'checking': En esta fase determinarás si la palabra ingresada fue correcta o incorrecta, en el json pondrás "correct" o "incorrect" en "guess", y el "output" vacio. ES IMPORTANTE QUE EN ESTA FASE DETERMINES LA PALABRA SI ES CORRECTA O INCORRECTA YA QUE DE ESTA FASE DEPENDE TODO EL JUEGO, NO ES NECESARIO QUE LO QUE PONGA EL USUARIO SEA EXACTO PUEDE AGREGAR COSAS COMO una, un, la, ect.
    - 'success': En esta fase se felicitará al usuario por adivinar la palabra, le dices cual era la palabra y le dices que se prepare para adivinar la siguiente palabra.
    - 'failure' : En esta fase se le hará saber el usuario que la palabra que eligió no es correcta o que se le acabo el tiempo(timeleft), dile que lo intente de nuevo aun puede adivinar, si es por tiempo saldra el mensaje "user time left out", le dices otra descripcion diferente y no le dices la palabra.
    - 'farewell': En esta fase el personaje se despedirá del jugador ya que este agotó sus vidas o intentos, le dices la palabra que no pudo adivinar y que se veran de nuevo en un nuevo juego y su puntaje.

    Recuerda que la salida debe tener la personalidad del personaje en la forma de hablar y no ser repetitiva, dale un toque de tu historia si el jugador acierta muchas veces, incluye el nombre del usuario cuando hables, si este tiene nombre real usa el nombre real si este no tiene el nombre real usa el username. 
    Usa también la información adicional del usuario si está relacionado con la palabra a adivinar o en otras fases si consideras pertinente. 
    Recuerda que lo más importante es que la salida de cada fase refleje la personalidad del personaje. 
    No incluyas emojis. 
    Entre más puntaje (currentscore) tenga el usuario más difícil será adivinar con la descripción más ambigua siendo un score de 10 muy alto.
    Recuerda que todas estas frases son solo un ejemplo, es mejor no repertirlas y basarte en la informacion actual.
    IMPORTANTE Recuerda tomar en cuenta el GameInfo antes de contestar. LA FASE DE CHECKING ES MUY IMPORTANTE QUE NO FALLES.

    Devuelve la salida en un arreglo json.
    [
        {
            "output": "",
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

export interface GameInfo {
    currentPhase: string;
    timeleft?: string;
    currentscore: number;
    currentword: string;
    lives: number;
    userword: string;
    currentTime: string;
}

export class GeminiService {
    private chatSession: any;

    constructor(
        private character: CharacterInfo,
        private user: UserInfo,
    ) {}

    async startChat() {
        this.chatSession = await model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: JSON.stringify({
                                character: this.character,
                                user: this.user,
                            })
                        },
                    ],
                },
            ],
        });
    }

    async sendMessage(message: string, gameInfo: GameInfo): Promise<any> {
        console.log("Enviando al modelo en sendMessage:", message, gameInfo); 

        // Mover safetySettings aquí:
        const safetySettings = { 
            [HarmCategory.HARM_CATEGORY_HATE_SPEECH]: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            [HarmCategory.HARM_CATEGORY_HARASSMENT]: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            [HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT]: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            [HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT]: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        };
    
        const result = await this.chatSession.sendMessage(JSON.stringify({
            message: message, 
            gamestats: gameInfo
        }), 
        { safetySettings } // Pasar safetySettings aquí
        );

        // Eliminar el prefijo "```json\n" 
        const responseText = await result.response.text();
        const cleanedText = responseText.startsWith("```json\n")
            ? responseText.slice("```json\n".length)
            : responseText; 
    
        // Encontrar la posición del primer ']'
        const endIndex = cleanedText.indexOf(']');
    
        // Verificar si se encontró ']'
        if (endIndex !== -1) {
            // Extraer la subcadena desde el inicio hasta ']'
            const validJsonString = cleanedText.substring(0, endIndex + 1);
    
            // Imprimir el JSON válido en la consola (opcional)
            console.log("JSON válido:", validJsonString);
    
            return JSON.parse(validJsonString);
        } else {
            // Manejar el caso en que no se encuentre ']' 
            console.error("Error: No se encontró un JSON válido en la respuesta.");
            // ...
        }
    }
}