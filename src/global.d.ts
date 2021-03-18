interface Student {
  id: string;
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  email: string;
  nivel: number;
  grupo: string;
}

interface StudentEnglish {
  id: string;
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nivel: number;
  grupo: string;
}

type Selected = {
  codigo: string;
  option_id: string;
};

type Reservation = StudentEnglish & {
  option_id: string;
};

type Attendance = {
  attendance: boolean;
  code: string;
  name: string;
  first_last_name: string;
  second_last_name: string;
  telephone: string;
  email: string;
  level: number;
  group: string;
};

type Workshop = {
  name: string;
  description: string;
  options: Option[];
};

type Option = {
  id: string;
  teacher: string;
  teacher_id: string;
  time: string;
  day: "lunes" | "martes" | "miercoles" | "jueves";
  url: string;
  workshop:
    | "conversation"
    | "toeflpreparation"
    | "basicreading"
    | "basicadvancedlistening"
    | "tutoring";
  zoom_id?: string | undefined;
  available: boolean;
};

type Teacher = {
  id: string;
  name: string;
  options: { time: string; day: string; workshop: string }[];
  reservations: Reservation[];
};
