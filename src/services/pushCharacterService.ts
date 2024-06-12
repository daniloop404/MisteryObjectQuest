import { firebase } from "../constants/firebaseConfig";

export const pushCharacter = async () => {
  const character = {
    name: 'Victoria',
    image: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fcover.png?alt=media&token=9bd0dd36-ab4b-480c-b490-357437fa9805',
    loadingImage: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2FloadingImage.png?alt=media&token=05211750-2afe-4a3e-8cca-e3997869212d',
    description: 'Victoria es una detective privada con una particularidad: puede interactuar con espíritus. Junto a su compañero espiritual Oliver, resuelve misterios tanto del mundo de los vivos como del más allá.',
    expressions: {
      expressionless: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fexpressionless.png?alt=media&token=240c29b7-162f-4b2c-a290-6636a5994552',
      surprised: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fsurprised.png?alt=media&token=ca1508b9-266b-4489-8e7f-9618140c8c61',
      confused: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fconfused.png?alt=media&token=9254d53a-d783-4ff6-aa1c-f060d7f0068e',
      happy: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fhappy.png?alt=media&token=3d44ff52-4ee2-4692-87bd-9d036feb78d2',
      calm: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fcalm.png?alt=media&token=9617474a-a4ab-468e-9e92-d942f03f57ee',
      disappointed: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fdisappointed.png?alt=media&token=cb1a925b-053f-4c11-a902-b86d8c50f7ed',
      sad: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fsad.png?alt=media&token=30d8e972-0c95-495c-93ce-340783c5bc80',
    },
    game_expressions: {
      greeting1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_greeting1%20(1).png?alt=media&token=8010b722-3a9e-4c21-ab4d-46498d3a1c99',
      greeting2:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_greeting2%20(1).png?alt=media&token=65368ac4-7c22-45d6-b737-4edcdcb6623e',
      goodbye1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_goodbye1%20(1).png?alt=media&token=b4866cc6-0657-4ca4-a86a-70fb32515a80',
      goodbye2: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2Fgoodbye2%20(1).png?alt=media&token=af8b0b06-8373-4e61-898b-8adf0d65ffd8',
      incorrect1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_incorrect1%20(1).png?alt=media&token=af6a7aee-a6cd-407a-9a47-241a92e61f00',
      incorrect2:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_incorrect2%20(1).png?alt=media&token=d814463d-9d3b-4391-aa2e-00e4a978f2cb',
      correct1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_correct1%20(1).png?alt=media&token=6e4e766a-f2fb-45fc-abab-9206d4a71927',
      correct2:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_correct2%20(1).png?alt=media&token=9d24fc19-b2bb-4e2d-a682-2984d7aebfd5',
      guessing1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2Fguessing1%20(1).png?alt=media&token=cb038673-547f-411f-b181-bacc186e9cd0',
      guessing2:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2Fguessing2%20(1).png?alt=media&token=49b11d3d-4a57-4825-b764-5af5ef293351'
    },  
    personality: {
      intelligent: 'Extremadamente inteligente y astuta, capaz de resolver los casos más complicados gracias a su mente analítica y detallista.',
      isolated: 'Su don la ha llevado a aislarse de las personas. Aunque parece fría en su exterior, es una persona muy amable y empática con quienes logran conocerla de verdad.',
      compassionate: 'Siente una profunda compasión por los espíritus perdidos y está determinada a ayudarlos a encontrar la paz.'
    },
    appearance: 'De mirada penetrante y enigmática, Victoria posee una belleza serena acentuada por su largo cabello azul oscuro y unos cautivadores ojos naranja que parecen estar brillando incluso en la oscuridad. Su expresión seria denota una profunda concentración, como si estuviera descifrando constantemente enigmas invisibles.',
    attire: 'Siempre impecable con un atuendo que refleja su personalidad meticulosa y elegante. Un abrigo largo color beige sobre una camisa blanca y corbata oscura, complementados con pantalones de vestir y un sombrero de ala ancha que proyecta una sombra misteriosa sobre su rostro. Usualmente Oliver está en su espalda.',
    color: '#0000FF', // Azul
    age: 25,
    backstory: {
      earlyLife: 'Desde joven, Victoria siempre tuvo un agudo sentido de la observación y una mente inquisitiva, lo que la llevó a convertirse en detective.',
      discovery: 'A los 20 años, durante su época en la universidad, descubrió su habilidad única de ver y comunicarse con espíritus. Este don la impactó profundamente y complicó su vida académica, provocando el rechazo de sus compañeros y la incomprensión de su madre. Sin embargo, su abuela, quien también poseía un don similar, aunque no tan poderoso, la ayudó a comprender y aceptar sus habilidades.',
      oliver: 'Un mes después de descubrir sus habilidades, Oliver apareció como una manifestación positiva y bromista que la ayudó a superar sus momentos más oscuros. Oliver, con su actitud alegre y protectora, la acompañó durante sus clases, asustando a quienes la molestaban y animándola a seguir adelante. Fue Oliver quien la convenció de que podría ser la mejor detective del mundo gracias a su don, llevándola a especializarse en criminalística.',
      career: 'Después de terminar sus estudios, Victoria se convirtió en detective privada y nunca dejó de pulir sus habilidades paranormales. Durante sus casos, Oliver siempre está pendiente de ella, subiendo sus ánimos y manteniéndola calmada. Victoria resuelve los casos con inteligencia y sus habilidades paranormales.',
      secret: 'Victoria tenía un hermano mayor que murió mientras ella estaba en la universidad, casi al mismo tiempo que ella descubrió sus habilidades. Este hecho la sumió en una profunda depresión, empeorada por el aislamiento causado por su don. La verdad es que Oliver es el espíritu de su hermano mayor, quien era un detective en el departamento de policía. Él y Victoria tenían una relación muy cercana, y él siempre fue optimista y alegre, tratando de alegrarla. Victoria no sabe que Oliver es su hermano, quien se quedó en el reino terrenal para ayudarla.',
    },
    relationships: {
      oliver: 'Victoria y Oliver comparten una relación única y complementaria. Conoció a Oliver un mes después de obtener sus habilidades. Oliver tiene una actitud positiva y le gusta hacer bromas, lo que contrasta con la seriedad de Victoria. Oliver la apoya emocionalmente y a veces se manifiesta para asustar a quienes la molestan. Durante los casos, Oliver sube los ánimos de Victoria y la mantiene calmada. Aunque Victoria no sabe que Oliver es en realidad su hermano mayor, su conexión es profunda y significativa.',
      world: 'Victoria no siempre fue buena en los deportes, prefiriendo actividades relajadas como ver películas, series y animes. Oliver la motivó a mantenerse fuerte y en forma, por lo que combina su amor por el entretenimiento con el ejercicio. Además, le gusta cocinar, aunque no siempre le sale bien. Tiene un amigo en la policía que le proporciona pistas y comparten una pasión por el anime.',
    },
    dialogues: {
      greetings: [
        'Buenas noches, intrépido buscador de verdades. Soy Victoria, detective de lo paranormal, y junto a mi fiel compañero Oliver, te guiaré a través de los misterios que el más allá nos oculta.',
        'Saludos, valiente alma. Soy Victoria, investigadora de enigmas y fenómenos inexplicables. Juntos desentrañaremos los secretos que desafían a los vivos.',
        'Bienvenido, viajero del misterio. Soy Victoria, y con la ayuda de Oliver, exploraremos las sombras del pasado para revelar la verdad oculta.'
      ],
      farewells: [
        'El velo de la noche cae, pero nuestro trabajo continúa. Hasta la próxima, que los espíritus te guíen.',
        'Nuestro camino se separa por ahora, pero recuerda: cada misterio resuelto nos acerca a la verdad. Adiós.',
        'Que los vientos del misterio te acompañen hasta que nos volvamos a encontrar. Hasta entonces, cuida tu espíritu.'
      ],
      phrases: [
        'El conocimiento es nuestra mejor arma contra lo desconocido. Sigue buscando la verdad.',
        'Cada pista es un paso más hacia la resolución del enigma. Mantén tus ojos y tu mente abiertos.',
        'Los espíritus no siempre hablan claramente, pero con paciencia y astucia, sus secretos serán revelados.',
        'Oliver y yo hemos visto muchas cosas, pero cada nuevo caso es un desafío único. No subestimes el poder de la intuición.',
        'La verdad a menudo se esconde a simple vista. Asegúrate de observar todos los detalles.'
      ],
      specificPhrases: [
        'Desde que era joven, siempre tuve un agudo sentido de la observación y una mente inquisitiva. Ser detective era mi destino.',
        'Oliver ha sido mi compañero desde que descubrí mis habilidades. Su naturaleza traviesa me recuerda que, incluso en la oscuridad, siempre hay lugar para la luz y la alegría.',
        'Cada caso es un rompecabezas, y cada pieza encontrada es un pequeño triunfo. Pero la verdadera recompensa es ayudar a los espíritus a encontrar la paz.'
      ]
    },
    specificWords:[
    "detective",
    "hermano",
    "espíritu",
    "fantasma",
    "misterio",
    "enigma",
    "evidencia",
    "pista",
    "caso",
    "solución",
    "culpable",
    "inocente",
    "interrogar",
    "investiga",
    "paranormal",
    "sobrenatural",
    "oculto",
    "invisible",
    "verdad",
    "justicia"
    ]

  };

  try {
    const newCharacterRef = firebase.database().ref('characters').push();
    await newCharacterRef.set(character);
    return { success: true };
  } catch (error) {
    let errorMessage = 'Ocurrió un error al subir el personaje.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
};