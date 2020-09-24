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
          { teacher: "alondra", time: "13:00 - 14:00" },
          { teacher: "gonzalo", time: "14:00 - 15:00" },
        ],
      },
      {
        name: "Martes",
        options: [
          { teacher: "alondra", time: "13:00 - 14:00" },
          { teacher: "sergio", time: "14:00 - 15:00" },
          { teacher: "gissel", time: "16:00 - 17:00" },
        ],
      },
      {
        name: "Miercoles",
        options: [
          { teacher: "carlos", time: "12:00 - 13:00" },
          { teacher: "sergio", time: "14:00 - 15:00" },
          { teacher: "gissel", time: "16:00 - 17:00" },
        ],
      },
      {
        name: "Jueves",
        options: [
          { teacher: "gonzalo", time: "14:00 - 15:00" },
          { teacher: "zullet", time: "13:00 - 14:00" },
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
        options: [{ teacher: "carlos", time: "12:00 - 13:00" }],
      },
      {
        name: "Martes",
        options: [{ teacher: "carlos", time: "12:00 - 13:00" }],
      },
      {
        name: "Miercoles",
        options: [
          {
            teacher: "jiselaine",
            time: "11:00 - 12:00",
          },
        ],
      },
      {
        name: "Jueves",
        options: [
          {
            teacher: "jiselaine",
            time: "11:00 - 12:00",
          },
        ],
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
        options: [
          {
            teacher: "alondra",
            time: "13:00 - 14:00",
          },
        ],
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
        options: [{ teacher: "zullet", time: "12:00 - 13:00" }],
      },
      {
        name: "Martes",
        options: [{ teacher: "zullet", time: "12:00 - 13:00" }],
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
          { teacher: "sergio", time: "14:00 - 15:00" },
          { teacher: "gissel", time: "16:00 - 17:00" },
        ],
      },
      {
        name: "Miercoles",
        options: [{ teacher: "zullet", time: "11:00 - 12:00" }],
      },
    ],
  },
];

interface WorkshopFlat {
  id: string;
  name: string;
  description: string;
}

interface Database {
  workshops: WorkshopFlat[];
}

const db: Database = {
  workshops: [
    {
      id: "conversation",
      name: "Conversation",
      description:
        "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
    },
    {
      id: "toeflpreparation",
      name: "TOEFL Preparation",
      description:
        "Ayuda a desarrollar habilidades para el examen de certificación, a partir del dominio ya adquirido del idioma. Duracion: 1 mes.",
    },
    {
      id: "basicreading",
      name: "Basic Reading",
      description:
        "Lectura de textos e historias sencillas para trabajar con vocabulario y lectura de comprensión. Niveles 1-3",
    },
    {
      id: "basicadvancedlistening",
      name: "Basic/Advanced Listening",
      description:
        "Ayuda a desarrollar la habilidad de comprensión de escucha por medio de audios. Basic: Niveles 1-3; Advanced: Niveles 4-6",
    },
    {
      id: "tutoring",
      name: "Tutoring",
      description:
        "Es un proceso de acompañamiento, aclarando dudas. El alumno deberá saber exactamente el tema a repasar.",
    },
  ],
};

export default db;
