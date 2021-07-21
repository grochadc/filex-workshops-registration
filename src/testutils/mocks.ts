import {
  MAKE_RESERVATION,
  GET_RESERVATIONS,
  SAVE_ATTENDANCE,
  GET_STUDENT,
} from "../queries";

export const makeReservationMock: Mock = {
  request: {
    query: MAKE_RESERVATION,
    variables: { codigo: "1234567890", option_id: "alondralunes" },
  },
  result: {
    data: {
      makeWorkshopReservation: {
        id: "2pst3k",
        timestamp: "2021-03-04T10:42:28.361Z",
        codigo: "1234567890",
        nombre: "Benito Antonio",
        url: "https://meet.google.com/lookup/fnms6k7cad",
        zoom_id: null,
      },
    },
  },
};

export const getReservationsMock: Mock = {
  request: {
    query: GET_RESERVATIONS,
    variables: { teacher: "gonzalo" },
  },
  result: {
    data: {
      teacher: {
        name: "Gonzalo",
        options: [
          {
            time: "13:00 - 14:00",
            day: "lunes",
            workshop: "conversation",
          },
        ],
        reservations: [
          {
            code: "1234567890",
            name: "BENITO ANTONIO",
            first_last_name: "MARTINEZ",
            second_last_name: "OCASIO",
            level: 5,
            group: "E5-6",
            timestamp: "2020-11-23T19:16:18.493Z",
            option: {
              day: "lunes",
            },
          },
        ],
      },
    },
  },
};

export const saveAttendanceMock: Mock = {
  request: {
    query: SAVE_ATTENDANCE,
    variables: {
      students: [
        {
          workshop: "conversation",
          teacher: "Gonzalo",
          attended: true,
          code: "1234567890",
          name: "BENITO ANTONIO",
          first_last_name: "MARTINEZ",
          second_last_name: "OCASIO",
          group: "E5-6",
          level: 5,
        },
      ],
    },
  },
  result: {
    data: { saveWorkshopsAttendance: { success: true } },
  },
};

export const getStudentMock: Mock = {
  request: { query: GET_STUDENT, variables: { code: "1234567890" } },
  result: {
    data: {
      student: {
        codigo: "1234567890",
        nombre: "BENITO ANTONIO",
        nivel: "4",
      },
      studentReservation: null,
      workshops: [
        {
          name: "Conversation",
          description:
            "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
          levels: ["1", "2", "3", "4", "5", "6"],
          options: [
            {
              id: "brendalunes",
              day: "lunes",
              time: "12:00 - 13:00",
              teacher: "Brenda",
              workshop: "Conversation",
              url:
                "https://us04web.zoom.us/j/77370162343?pwd=VFpCS2xqejF1blJvY2t4OWk1c3RtQT09",
              zoom_id: null,
              available: true,
            },
          ],
        },
      ],
    },
  },
};
