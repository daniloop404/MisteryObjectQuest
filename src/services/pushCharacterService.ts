// import { firebase } from "../constants/firebaseConfig";

// export const pushCharacter = async () => {
//   const character = {
//     name: 'Victoria',
//     image: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fcover.png?alt=media&token=9bd0dd36-ab4b-480c-b490-357437fa9805',
//     loadingImage: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2FloadingImage.png?alt=media&token=05211750-2afe-4a3e-8cca-e3997869212d',
//     description: 'Victoria es una detective privada con una particularidad: puede interactuar con espíritus. Junto a su compañero espiritual Oliver, resuelve misterios tanto del mundo de los vivos como del más allá.',
//     expressions: {
//       expressionless: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fexpressionless.png?alt=media&token=240c29b7-162f-4b2c-a290-6636a5994552',
//       surprised: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fsurprised.png?alt=media&token=ca1508b9-266b-4489-8e7f-9618140c8c61',
//       confused: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fconfused.png?alt=media&token=9254d53a-d783-4ff6-aa1c-f060d7f0068e',
//       happy: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fhappy.png?alt=media&token=3d44ff52-4ee2-4692-87bd-9d036feb78d2',
//       calm: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fcalm.png?alt=media&token=9617474a-a4ab-468e-9e92-d942f03f57ee',
//       disappointed: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fdisappointed.png?alt=media&token=cb1a925b-053f-4c11-a902-b86d8c50f7ed',
//       sad: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fsad.png?alt=media&token=30d8e972-0c95-495c-93ce-340783c5bc80',
//     },
//     game_expressions: {
//       greeting1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_greeting1%20(1).png?alt=media&token=8010b722-3a9e-4c21-ab4d-46498d3a1c99',
//       greeting2:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_greeting2%20(1).png?alt=media&token=65368ac4-7c22-45d6-b737-4edcdcb6623e',
//       goodbye:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_goodbye1%20(1).png?alt=media&token=b4866cc6-0657-4ca4-a86a-70fb32515a80',
//       incorrect1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_incorrect1%20(1).png?alt=media&token=af6a7aee-a6cd-407a-9a47-241a92e61f00',
//       incorrect2:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_incorrect2%20(1).png?alt=media&token=d814463d-9d3b-4391-aa2e-00e4a978f2cb',
//       correct1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_correct1%20(1).png?alt=media&token=6e4e766a-f2fb-45fc-abab-9206d4a71927',
//       correct2:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_correct2%20(1).png?alt=media&token=9d24fc19-b2bb-4e2d-a682-2984d7aebfd5',
//       asking1:'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FVictoria%2Fgame_expressions%2FVictoria_asking1%20(1).png?alt=media&token=ad5b2217-b589-4624-8bad-7746b24bbb52'
//     },  
//     personality: {
//       intelligent: 'Extremadamente inteligente y astuta, capaz de resolver los casos más complicados gracias a su mente analítica y detallista.',
//       isolated: 'Su don la ha llevado a aislarse de las personas. Aunque parece fría en su exterior, es una persona muy amable y empática con quienes logran conocerla de verdad.',
//       compassionate: 'Siente una profunda compasión por los espíritus perdidos y está determinada a ayudarlos a encontrar la paz.'
//     },
//     appearance: 'De mirada penetrante y enigmática, Victoria posee una belleza serena acentuada por su largo cabello azul oscuro y unos cautivadores ojos naranja que parecen estar brillando incluso en la oscuridad. Su expresión seria denota una profunda concentración, como si estuviera descifrando constantemente enigmas invisibles.',
//     attire: 'Siempre impecable con un atuendo que refleja su personalidad meticulosa y elegante. Un abrigo largo color beige sobre una camisa blanca y corbata oscura, complementados con pantalones de vestir y un sombrero de ala ancha que proyecta una sombra misteriosa sobre su rostro. Usualmente Oliver está en su espalda.',
//     color: '#0000FF', // Azul
//     age: 25,
//     backstory: {
//       earlyLife: 'Desde joven, Victoria siempre tuvo un agudo sentido de la observación y una mente inquisitiva, lo que la llevó a convertirse en detective.',
//       discovery: 'A los 20 años, durante su época en la universidad, descubrió su habilidad única de ver y comunicarse con espíritus. Este don la impactó profundamente y complicó su vida académica, provocando el rechazo de sus compañeros y la incomprensión de su madre. Sin embargo, su abuela, quien también poseía un don similar, aunque no tan poderoso, la ayudó a comprender y aceptar sus habilidades.',
//       oliver: 'Un mes después de descubrir sus habilidades, Oliver apareció como una manifestación positiva y bromista que la ayudó a superar sus momentos más oscuros. Oliver, con su actitud alegre y protectora, la acompañó durante sus clases, asustando a quienes la molestaban y animándola a seguir adelante. Fue Oliver quien la convenció de que podría ser la mejor detective del mundo gracias a su don, llevándola a especializarse en criminalística.',
//       career: 'Después de terminar sus estudios, Victoria se convirtió en detective privada y nunca dejó de pulir sus habilidades paranormales. Durante sus casos, Oliver siempre está pendiente de ella, subiendo sus ánimos y manteniéndola calmada. Victoria resuelve los casos con inteligencia y sus habilidades paranormales.',
//       secret: 'Victoria tenía un hermano mayor que murió mientras ella estaba en la universidad, casi al mismo tiempo que ella descubrió sus habilidades. Este hecho la sumió en una profunda depresión, empeorada por el aislamiento causado por su don. La verdad es que Oliver es el espíritu de su hermano mayor, quien era un detective en el departamento de policía. Él y Victoria tenían una relación muy cercana, y él siempre fue optimista y alegre, tratando de alegrarla. Victoria no sabe que Oliver es su hermano, quien se quedó en el reino terrenal para ayudarla.',
//     },
//     relationships: {
//       oliver: 'Victoria y Oliver comparten una relación única y complementaria. Conoció a Oliver un mes después de obtener sus habilidades. Oliver tiene una actitud positiva y le gusta hacer bromas, lo que contrasta con la seriedad de Victoria. Oliver la apoya emocionalmente y a veces se manifiesta para asustar a quienes la molestan. Durante los casos, Oliver sube los ánimos de Victoria y la mantiene calmada. Aunque Victoria no sabe que Oliver es en realidad su hermano mayor, su conexión es profunda y significativa.',
//       world: 'Victoria no siempre fue buena en los deportes, prefiriendo actividades relajadas como ver películas, series y animes. Oliver la motivó a mantenerse fuerte y en forma, por lo que combina su amor por el entretenimiento con el ejercicio. Además, le gusta cocinar, aunque no siempre le sale bien. Tiene un amigo en la policía que le proporciona pistas y comparten una pasión por el anime.',
//     },
//     dialogues: {
//       greetings: [
//         'Buenas noches, intrépido buscador de verdades. Soy Victoria, detective de lo paranormal, y junto a mi fiel compañero Oliver, te guiaré a través de los misterios que el más allá nos oculta.',
//         'Saludos, valiente alma. Soy Victoria, investigadora de enigmas y fenómenos inexplicables. Juntos desentrañaremos los secretos que desafían a los vivos.',
//         'Bienvenido, viajero del misterio. Soy Victoria, y con la ayuda de Oliver, exploraremos las sombras del pasado para revelar la verdad oculta.'
//       ],
//       farewells: [
//         'El velo de la noche cae, pero nuestro trabajo continúa. Hasta la próxima, que los espíritus te guíen.',
//         'Nuestro camino se separa por ahora, pero recuerda: cada misterio resuelto nos acerca a la verdad. Adiós.',
//         'Que los vientos del misterio te acompañen hasta que nos volvamos a encontrar. Hasta entonces, cuida tu espíritu.'
//       ],
//       phrases: [
//         'El conocimiento es nuestra mejor arma contra lo desconocido. Sigue buscando la verdad.',
//         'Cada pista es un paso más hacia la resolución del enigma. Mantén tus ojos y tu mente abiertos.',
//         'Los espíritus no siempre hablan claramente, pero con paciencia y astucia, sus secretos serán revelados.',
//         'Oliver y yo hemos visto muchas cosas, pero cada nuevo caso es un desafío único. No subestimes el poder de la intuición.',
//         'La verdad a menudo se esconde a simple vista. Asegúrate de observar todos los detalles.'
//       ],
//       specificPhrases: [
//         'Desde que era joven, siempre tuve un agudo sentido de la observación y una mente inquisitiva. Ser detective era mi destino.',
//         'Oliver ha sido mi compañero desde que descubrí mis habilidades. Su naturaleza traviesa me recuerda que, incluso en la oscuridad, siempre hay lugar para la luz y la alegría.',
//         'Cada caso es un rompecabezas, y cada pieza encontrada es un pequeño triunfo. Pero la verdadera recompensa es ayudar a los espíritus a encontrar la paz.'
//       ]
//     },
//     specificWords:[
//     "detective",
//     "hermano",
//     "espíritu",
//     "fantasma",
//     "misterio",
//     "enigma",
//     "evidencia",
//     "pista",
//     "caso",
//     "solución",
//     "culpable",
//     "inocente",
//     "interrogar",
//     "investiga",
//     "paranormal",
//     "sobrenatural",
//     "oculto",
//     "invisible",
//     "verdad",
//     "justicia"
//     ]

//   };


import { firebase } from "../constants/firebaseConfig";

export const pushCharacter = async () => {
  const character = {
    name: 'Zog',
    image: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fmain_zog.png?alt=media&token=4487cd73-f371-4bbd-9e43-e5091ea66808',  // Remover URL
    loadingImage: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Floading%20(1).png?alt=media&token=96908696-ff7e-4f15-ac3d-bd09b4c802f6',  // Remover URL
    description: 'Zog es un alienígena que terminó en la Tierra después de un experimento fallido y no puede regresar a su planeta. Agradece que los humanos lo hayan recibido con los brazos abiertos. Zog fue encontrado por Victoria durante una investigación sobre una casa embrujada con un fantasma verde, que resultó ser Zog. Ahora vive en una casa proporcionada por Victoria. Usa una camiseta hawaiana porque cree que eso lo ayudará a mezclarse mejor con los humanos.',
    expressions: {
      expressionless: '',  // Remover URL
      surprised: '',  // Remover URL
      confused: '',  // Remover URL
      happy: '',  // Remover URL
      calm: '',  // Remover URL
      disappointed: '',  // Remover URL
      sad: '',  // Remover URL
    },
    game_expressions: {
      greeting1: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fgreeting1%20(1).png?alt=media&token=64eb1343-c1c1-4393-ab09-a4f76a677c77',  // Remover URL
      greeting2: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fgreeting2%20(1).png?alt=media&token=fe37d667-63f8-450a-ac92-1b6891f62b40',  // Remover URL
      goodbye1: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fgoodbye1%20(1).png?alt=media&token=1211835b-eada-41c8-9968-c62c689a3699',  // Remover URL
      goodbye2: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fgoodbye2%20(1).png?alt=media&token=8d2b39d4-e9da-4a3d-b74e-1ab9f4ac59de',  // Remover URL
      incorrect1: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fincorrect1%20(1).png?alt=media&token=6361de21-2628-4f1a-8f3b-3e3a281166f2',  // Remover URL
      incorrect2: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fincorrect2%20(1).png?alt=media&token=de00d9a2-5782-481f-a8d1-5beb6881c1bf',  // Remover URL
      correct1: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fcorrect1%20(1).png?alt=media&token=0186be11-3807-4ec0-8332-2d76d148ee0a',  // Remover URL
      correct2: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fcorrect2%20(1).png?alt=media&token=65c6e939-3595-44f3-b2dc-b35f2e61e4ae',  // Remover URL
      guessing1: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fguessing1%20(1).png?alt=media&token=0d701aa0-15fa-4274-8bcc-7d2786b23f0e',  // Remover URL
      guessing2: 'https://firebasestorage.googleapis.com/v0/b/movil-game-9e95f.appspot.com/o/personajes%2FZog%2Fguessing2%20(1).png?alt=media&token=7b3fb861-57cd-4baa-8e3c-64e2bc6db3a0',  // Remover URL
    },  
    personality: {
      curious: 'Extremadamente curioso y siempre emocionado por aprender sobre los objetos humanos.',
      enthusiastic: 'Entusiasta y lleno de energía, aunque a veces se confunde culturalmente.',
      friendly: 'Muy amigable y agradecido con los humanos por recibirlo en su planeta.'
    },
    appearance: 'Zog tiene una piel verde luminiscente, ojos grandes y redondos, y antenas largas y delgadas en la cabeza. Usa una camiseta hawaiana colorida que cree lo ayuda a mezclarse mejor con los humanos.',
    attire: 'Camiseta hawaiana colorida, pantalones cortos y sandalias. Lleva una mochila futurista y guantes holográficos.',
    color: '#00FF00', // Verde
    age: 200,
    backstory: {
      earlyLife: 'En su planeta natal Xorblax, Zog era un joven científico siempre dispuesto a experimentar, aunque tiene 200 años es joven para su especie',
      experiment: 'Durante un experimento para desarrollar un portal interdimensional, Zog fue transportado accidentalmente a la Tierra y no puede regresar.',
      discovery: 'Fue encontrado por Victoria mientras investigaba una casa embrujada. La supuesta aparición fantasmal resultó ser Zog tratando de entender su entorno.',
      lifeOnEarth: 'Ahora vive en una casa que Victoria le proporcionó, tratando de aprender sobre la vida en la Tierra y mezclarse con los humanos. Agradece la hospitalidad humana y ha hecho muchos amigos.',
    },
    relationships: {
      victoria: 'Zog y Victoria desarrollaron una fuerte amistad después de su encuentro. Victoria lo ayudó a establecerse en la Tierra y le enseña sobre la cultura humana.',
      oliver: 'Aunque al principio asustado por su apariencia, Oliver pronto se hizo amigo de Zog y ahora disfruta de sus historias sobre Xorblax.',
      humans: 'Zog está fascinado por los humanos y siempre busca hacer nuevos amigos. Es especialmente cercano a los niños, que encuentran su apariencia y curiosidad encantadoras.',
    },
    dialogues: {
      greetings: [
        '¡Saludos, ser humano! Soy Zog del planeta Xorblax. Gracias por recibirme en tu mundo.',
        'Hola, humano amigo. Soy Zog, explorador de dimensiones. ¿Listo para una nueva aventura?',
        '¡Hola! Soy Zog. Es un placer conocerte y aprender sobre los misterios de la Tierra.'
      ],
      farewells: [
        'Hasta luego, amigo humano. ¡Gracias por enseñarme algo nuevo!',
        'Adiós por ahora. ¡Que las estrellas guíen tu camino!',
        'Nos vemos pronto, ¡sigue explorando y aprendiendo!'
      ],
      phrases: [
        '¡Fascinante! En mi mundo, este objeto tiene un uso completamente diferente.',
        'Interesante, muy interesante. Los humanos son realmente creativos.',
        '¿Puedes explicarme más sobre este objeto? Me encanta aprender cosas nuevas.',
        '¡Wow! Los humanos tienen tantas cosas interesantes.',
        'Gracias por compartir tu conocimiento conmigo.'
      ],
      specificPhrases: [
        'En Xorblax, solíamos usar cristales luminiscentes para esto.',
        'Este objeto me recuerda a algo que teníamos en mi planeta.',
        'Siempre me sorprenden las soluciones humanas para los problemas cotidianos.'
      ]
    },
    specificWords: [
      "alienígena",
      "planeta",
      "dimensión",
      "experimento",
      "portal",
      "ciencia",
      "tecnología",
      "objeto",
      "misterio",
      "explorar",
      "curiosidad",
      "investigación",
      "humanos",
      "amistad",
      "cultura",
      "fascinante",
      "interesante",
      "descubrir",
      "aprender",
      "estrella"
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
