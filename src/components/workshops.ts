interface WorkshopOption {
  teacher: string;
  time: string;
}

interface WorkshopDay {
  name: string;
  options: WorkshopOption[];
}

interface Workshop {
  name: string;
  description: string;
  days: WorkshopDay[];
}

const workshops: Workshop[] = [
  {
    name: "Conversation",
    description:
      "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
    days: [
      {
        name: "Lunes",
        options: [
          { teacher: "Alondra", time: "13:00 - 14:00" },
          { teacher: "Gonzalo", time: "14:00 - 15:00" },
        ],
      },
      {
        name: "Martes",
        options: [
          { teacher: "Alondra", time: "13:00 - 14:00" },
          { teacher: "Sergio", time: "14:00 - 15:00" },
          { teacher: "Gissel", time: "16:00 - 17:00" },
        ],
      },
      {
        name: "Miercoles",
        options: [
          { teacher: "Carlos", time: "12:00 - 13:00" },
          { teacher: "Sergio", time: "14:00 - 15:00" },
          { teacher: "Gissel", time: "16:00 - 17:00" },
        ],
      },
      {
        name: "Jueves",
        options: [
          { teacher: "Gonzalo", time: "14:00 - 15:00" },
          { teacher: "Zullet", time: "13:00 - 14:00" },
        ],
      },
    ],
  },
  {
    name: "TOEFL Preparation",
    description:
      "Ayuda a desarrollar habilidades para el examen de certificación, a partir del dominio ya adquirido del idioma. Duracion: 1 mes.",
    days: [
      {
        name: "Lunes",
        options: [{ teacher: "Carlos", time: "12:00 - 13:00" }],
      },
      {
        name: "Martes",
        options: [{ teacher: "Carlos", time: "12:00 - 13:00" }],
      },
      {
        name: "Miercoles",
        options: [{ teacher: "Jiselaine", time: "11:00 - 12:00" }],
      },
      {
        name: "Jueves",
        options: [{ teacher: "Jiselaine", time: "11:00 - 12:00" }],
      },
    ],
  },
  {
    name: "Basic Reading",
    description:
      "Lectura de textos e historias sencillas para trabajar con vocabulario y lectura de comprensión. Niveles 1-3",
    days: [
      {
        name: "Miércoles",
        options: [{ teacher: "Alondra", time: "13:00 - 14:00" }],
      },
    ],
  },
  {
    name: "Basic/Advanced Listening",
    description:
      "Ayuda a desarrollar la habilidad de comprensión de escucha por medio de audios. Basic: Niveles 1-3; Advanced: Niveles 4-6",
    days: [
      {
        name: "Lunes",
        options: [{ teacher: "Zullet", time: "12:00 - 13:00" }],
      },
      {
        name: "Martes",
        options: [{ teacher: "Zullet", time: "12:00 - 13:00" }],
      },
    ],
  },
  {
    name: "Tutoring",
    description:
      "Es un proceso de acompañamiento, aclarando dudas. El alumno deberá saber exactamente el tema a repasar.",
    days: [
      {
        name: "Lunes",
        options: [
          { teacher: "Sergio", time: "14:00 - 15:00" },
          { teacher: "Gissel", time: "16:00 - 17:00" },
        ],
      },
      {
        name: "Martes",
        options: [{ teacher: "Gonzalo", time: "14:00 - 15:00" }],
      },
      {
        name: "Miercoles",
        options: [{ teacher: "Zullet", time: "11:00 - 12:00" }],
      },
    ],
  },
];

export default workshops;
