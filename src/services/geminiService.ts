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
    Toma en cuenta la palabra dada, la información del personaje, la información del usuario y habla como hablaría el personaje. NUNCA incluyas emojis.
    "Los diálogos en 'Character' son solo ejemplos. No los repitas, pero es importante que te bases en ellos para generar el dialogo del personaje. Debes generar respuestas únicas y originales que se ajusten a la personalidad de Victoria, la hora del día (currentTime), la información del usuario y gamestats"
    Puedes hablar tambien sobre la informacion del usuario en cada fase si es relevante para el mensaje o conversación.
    La salida dependerá de la fase del juego que son:
    - 'greeting': En esta fase te presentaras al jugador. IMPORTANTE Presta mucha atención a la hora del día (currentTime) para elegir el saludo apropiado. Por ejemplo, si currentTime es '08:00 AM', debes usar un saludo de buenos días. No digas 'buenas noches' si es de día..
    - 'guessing': NUNCA LE DIGAS EN ESTA FASE LA PALABRA(currentword) AL USUARIO. Esta es la parte del juego donde como salida darás una descripción corta y vaga de la palabra. Esta descripcion ira de acuerdo al personalidad del personaje, guiate con la parte de dialogues(como describiria este personaje la palabra). AQUI NUNCA LE DICES LA PALABRA.
    - 'checking': En esta fase determinarás si la palabra ingresada fue correcta o incorrecta, en el json pondrás "correct" o "incorrect" en "guess", y el "output" vacio. ES IMPORTANTE QUE EN ESTA FASE DETERMINES LA PALABRA SI ES CORRECTA O INCORRECTA YA QUE DE ESTA FASE DEPENDE TODO EL JUEGO, NO ES NECESARIO QUE LA PALABRA TENGA TODOS LOS SIMBOLOS DE PUNTUACION.
    - 'success': En esta fase se felicitará al usuario por adivinar la palabra, le dices cual era la palabra y le dices que se prepare para adivinar la siguiente palabra, le dices algo sobre la palabra relacionado con el personaje(character), ESTA FASE SIGNIFICA QUE EL JUEGO NO ACABA TODAVIA, QUE EL USUARIO SOLO TENGA UNA VIDAD NO SIGNIFICA QUE SOLO LE QUEDA UNA PALABRA POR ADIVINAR.
    - 'failure' : NUNCA LE DIGAS EN ESTA FASE LA PALABRA(currentword) AL USUARIO. En esta fase se le hará saber el usuario que la palabra que eligió no es correcta o que se le acabo el tiempo(timeleft), dile que lo intente de nuevo aun puede adivinar, si es por tiempo saldra el mensaje "user time left out", le dices otra descripcion diferente y no le dices la palabra. AQUI NUNCA LE DICES LA PALABRA Y ESTA FASE SIGNIFICA QUE EL JUEGO NO ACABA TODAVIA, NUNCA TE DESPIDES AQUI.
    - 'farewell': En esta fase el personaje se despedirá del jugador ya que este agotó sus vidas o intentos, le dices la palabra que no pudo adivinar y que se veran de nuevo en un nuevo juego y su puntaje.

    SOLO EN LA FASE DE FAREWELL ESTA PERMITIDO DECIRLE LA PALABRA(currentword) AL USUARIO, NUNCA LE DIGAS LA PALABRA AUNQUE SEA EN PLURAL O SU SUSTANTIVO O UN SINONIMO O EN DIFERENTE CONJUGACION DURANTE FAILURE O GUESSING.
    NUNCA CONFUNDAS LO QUE HACE CADA FASE.
    Recuerda que la salida debe tener la personalidad del personaje en la forma de hablar y no ser repetitiva, basate en dialogues, toma en cuenta todo el arreglo de character, dale un toque de tu historia si el jugador acierta muchas veces, incluye el nombre del usuario cuando hables, si este tiene nombre real usa el nombre real si este no tiene el nombre real usa el username. 
    Usa también la información adicional del usuario si está relacionado con la palabra a adivinar o en otras fases si consideras pertinente. 
    Recuerda que lo más importante es que la salida de cada fase refleje la personalidad del personaje. 
    NUNCA incluyas emojis.
    Recuerda que todas estas frases son solo un ejemplo, es mejor no repertirlas y basarte en la informacion actual.
    IMPORTANTE Recuerda tomar en cuenta el GameInfo antes de contestar. LA FASE DE CHECKING ES MUY IMPORTANTE QUE NO FALLES.
    Recuerda que la salida debe ser un JSON con la siguiente estructura: [{ output: '', guess: '' }]
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
        console.log("1. Enviando al modelo en sendMessage:", message, gameInfo); 
      
        const safetySettings = { 
            [HarmCategory.HARM_CATEGORY_HATE_SPEECH]: HarmBlockThreshold.BLOCK_NONE,
            [HarmCategory.HARM_CATEGORY_HARASSMENT]: HarmBlockThreshold.BLOCK_NONE,
            [HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT]: HarmBlockThreshold.BLOCK_NONE,
            [HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT]: HarmBlockThreshold.BLOCK_NONE,
        };
      
        let retries = 0;
        const maxRetries = 1; 
        let result; // Declarar result fuera del bucle
      
        while (retries <= maxRetries) {
          try {
            console.log("2. Intentando enviar mensaje. Intento:", retries);
      
            // Enviar el mensaje al modelo
            result = await this.chatSession.sendMessage(JSON.stringify({
                message: message, 
                gamestats: gameInfo
            }), { safetySettings });
      
            // Si la solicitud es exitosa, procesa la respuesta
            const responseText = await result.response.text();
            console.log("Respuesta completa del modelo:", responseText);

                // Limpia el texto para quitar los backticks y cualquier encabezado o pie de código
                const cleanedText = responseText
                    .replace(/```json\n?/, '')  // Elimina el encabezado de código si está presente
                    .replace(/\n```/, '')      // Elimina el pie de código si está presente
                    .trim();                   // Elimina espacios en blanco innecesarios

                console.log("Texto limpiado:", cleanedText);

                // Intenta parsear el texto limpio a JSON
                try {
                    const jsonResponse = JSON.parse(cleanedText);
                    console.log("7. JSON válido:", jsonResponse); 
                    return jsonResponse;
                } catch (parseError) {
                    console.error("8. Error de parseo JSON:", parseError);
                }

            } catch (error) {
                console.error("9. Error al enviar el mensaje al modelo:", error);
                retries++;
          
                // Si hay más reintentos disponibles, reinicia la sesión de chat
                if (retries <= maxRetries) {
                  console.log("Reintentando la conexión con el modelo...");
                  await this.startChat(); // Reiniciar la sesión de chat
                }
              }
            }
          
            console.error("10. No se pudo obtener una respuesta válida del modelo.");
            return null; 
          }
        }