import produce from "immer";

const initialState: State = {
  teacher: {
    id: "1",
    nombre: "Gonzalo Rocha",
    options: [
      {
        id: "1",
        day: "Lunes",
        time: "14:00-15:00",
        reservations: [],
      },
      {
        id: "2",
        day: "Martes",
        time: "14:00-15:00",
        reservations: [],
      },
    ],
  },
};

const reservationsMock: Reservation[] = [
  {
    id: "1",
    student: {
      codigo: "1234567890",
      nombre: "Benito Antonio",
      apellido_paterno: "Martinez",
      apellido_materno: "Ocasio",
      email: "bad@bunny.pr",
      telefono: "3412345678",
      nivel: 4,
      grupo: "E4-1",
    },
    attended: false,
  },
];

type Reservation = {
  id: string;
  student: {
    codigo: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    email: string;
    telefono: string;
    nivel: number;
    grupo: string;
  };
  attended: boolean;
  tutorialReason?: string;
};

type Option = {
  id: string;
  day: string;
  time: string;
  reservations?: Reservation[];
};

type State = {
  teacher: {
    id: string;
    nombre: string;
    options: Option[];
  };
};

type Action = {
  type: string;
  payload: {
    optionId: string;
    reservations: Reservation[];
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "APPEND_OPTION_RESERVATIONS":
      return produce(state, (draft) => {
        const option = draft.teacher.options.find((opt) => {
          return Boolean(opt.id === action.payload.optionId);
        });
        if (option) option.reservations = action.payload.reservations;
      });
    default:
      return state;
  }
};

const reducr = produce((draft: State, action: Action) => {
  switch (action.type) {
    case "APPEND_OPTION_RESERVATIONS":
      const option = draft.teacher.options.find((opt) => {
        return Boolean(opt.id === action.payload.optionId);
      });
      if(option) option.reservations = action.payload.reservations;
      break;
    default:
      break;
  }
});

test("reducer works", () => {
  const result = reducr(initialState, {
    type: "APPEND_OPTION_RESERVATIONS",
    payload: {
      reservations: reservationsMock,
      optionId: "1",
    },
  });

  expect(result).toEqual({
    teacher: {
      id: "1",
      nombre: "Gonzalo Rocha",
      options: [
        {
          id: "1",
          day: "Lunes",
          time: "14:00-15:00",
          reservations: [
            {
              id: "1",
              student: {
                codigo: "1234567890",
                nombre: "Benito Antonio",
                apellido_paterno: "Martinez",
                apellido_materno: "Ocasio",
                email: "bad@bunny.pr",
                telefono: "3412345678",
                nivel: 4,
                grupo: "E4-1",
              },
              attended: false,
            },
          ],
        },
        {
          id: "2",
          day: "Martes",
          time: "14:00-15:00",
          reservations: [],
        },
      ],
    },
  });
});
