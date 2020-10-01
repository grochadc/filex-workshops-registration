interface Workshop {
  id: string;
  name: string;
  description: string;
}

interface WorkshopOption {
  teacher: string;
  time: string;
  day: "lunes" | "martes" | "miercoles" | "jueves";
  workshop_id:
    | "conversation"
    | "toeflpreparation"
    | "basicreading"
    | "basicadvancedlistening"
    | "tutoring";
}

const db: {
  workshops: Workshop[];
  options: WorkshopOption[];
} = {
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
  options: [
    {
      teacher: "alondra",
      time: "13:00 - 14:00",
      day: "lunes",
      workshop_id: "conversation",
    },
    {
      teacher: "gonzalo",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "conversation",
    },
    {
      teacher: "alondra",
      time: "13:00 - 14:00",
      day: "lunes",
      workshop_id: "conversation",
    },
    {
      teacher: "alondra",
      time: "13:00 - 14:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      teacher: "sergio",
      time: "14:00 - 15:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      teacher: "gissel",
      time: "16:00 - 17:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      teacher: "carlos",
      time: "12:00 - 13:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      teacher: "sergio",
      time: "14:00 - 15:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      teacher: "gissel",
      time: "16:00 - 17:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      teacher: "gonzalo",
      time: "14:00 - 15:00",
      day: "jueves",
      workshop_id: "conversation",
    },
    {
      teacher: "zullet",
      time: "13:00 - 14:00",
      day: "jueves",
      workshop_id: "conversation",
    },
    {
      teacher: "carlos",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "toeflpreparation",
    },
    {
      teacher: "carlos",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "toeflpreparation",
    },
    {
      teacher: "jiselaine",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "toeflpreparation",
    },
    {
      teacher: "jiselaine",
      time: "11:00 - 12:00",
      day: "jueves",
      workshop_id: "toeflpreparation",
    },
    {
      teacher: "alondra",
      time: "13:00 - 14:00",
      day: "miercoles",
      workshop_id: "basicreading",
    },
    {
      teacher: "zullet",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "basicadvancedlistening",
    },
    {
      teacher: "zullet",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "basicadvancedlistening",
    },
    {
      teacher: "sergio",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "tutoring",
    },
    {
      teacher: "gissel",
      time: "16:00 - 17:00",
      day: "lunes",
      workshop_id: "tutoring",
    },
    {
      teacher: "zullet",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "tutoring",
    },
  ],
};

export default db;
