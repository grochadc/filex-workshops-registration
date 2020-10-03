type Option = {
  id: string;
  teacher: string;
  time: string;
  day: "lunes" | "martes" | "miercoles" | "jueves";
  url: string;
  workshop: "conversation" | "toeflpreparation" | "basicreading" | "basicadvancedlistening" | "tutoring";
  zoom_id?: string | undefined;
  available: boolean;
}

type Workshop = {
  name: string;
  description: string;
  options: Option[];
};

type Reservation = {
  code: string;
  name: string;
  option: Option;
  timestamp: string;
}

type WorkshopSelection = {
  code: string;
  name: string;
  url: string;
  zoom_id?: string;
  workshop_id: string;
  option_id: string;
  teacher: string;
};

type WorkshopSelection = {
  code: string;
  name: string;
  url: string;
  zoom_id?: string;
  workshop_id: string;
  option_id: string;
  teacher?: string;
};

type Teacher = {
  id: string;
  name: string;
  options: string[];
  reservations: Reservation[];
};
