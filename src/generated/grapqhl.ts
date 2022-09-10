import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  correct: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Applicant = {
  __typename?: 'Applicant';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  registeredSchedule?: Maybe<Schedule>;
  registering: Scalars['Boolean'];
  schedules: Array<Schedule>;
  telefono: Scalars['String'];
};

export type ApplicantInput = {
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type ApplicantResponse = {
  __typename?: 'ApplicantResponse';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type AttendingStudent = {
  attended: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type Carrera = {
  __typename?: 'Carrera';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CloseExamResponse = {
  __typename?: 'CloseExamResponse';
  isClosed: Scalars['Boolean'];
};


export enum Filter {
  All = 'ALL',
  Assigned = 'ASSIGNED',
  Nonassigned = 'NONASSIGNED'
}

export type Grades = {
  __typename?: 'Grades';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  codigo: Scalars['String'];
  cultural_task: Scalars['String'];
  final: Scalars['String'];
  final_grammar: Scalars['String'];
  final_oral: Scalars['String'];
  listening: Scalars['String'];
  midterm_grammar: Scalars['String'];
  midterm_oral: Scalars['String'];
  mini_project: Scalars['String'];
  nombre: Scalars['String'];
  reading: Scalars['String'];
  situation: Scalars['String'];
  workshops: Scalars['String'];
};

export type HomePageMessage = {
  __typename?: 'HomePageMessage';
  active: Scalars['Boolean'];
  message: Scalars['String'];
};

export type MeetLinkInput = {
  active: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type MeetLinkInputWithId = {
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addStudent: Student;
  closeExam?: Maybe<CloseExamResponse>;
  databaseSet: Scalars['Int'];
  editStudent: Student;
  makeWorkshopReservation: Reservation;
  registerStudent: RegisterResponse;
  removeMeetLink: Scalars['Int'];
  resetReservations: Scalars['Boolean'];
  saveApplicant: ApplicantResponse;
  saveOralResults: Scalars['Boolean'];
  saveRegisteringLevels: Array<Scalars['String']>;
  saveWorkshopsAttendance: Scalars['Boolean'];
  saveWrittenResults: MutationResponse;
  setMeetLink: Scalars['Int'];
  setMeetLinks: Scalars['Int'];
  setPlacementHomePageMessage: Scalars['Boolean'];
  setWorkshopLink: Scalars['Boolean'];
  toggleOpenWorkshops: Scalars['Boolean'];
};


export type MutationAddStudentArgs = {
  student: StudentInput;
};


export type MutationDatabaseSetArgs = {
  input?: Maybe<FirebaseInput>;
};


export type MutationEditStudentArgs = {
  changes?: Maybe<StudentChangesInput>;
  codigo: Scalars['ID'];
};


export type MutationMakeWorkshopReservationArgs = {
  option_id: Scalars['ID'];
  student_id: Scalars['ID'];
  tutorial_reason?: Maybe<Scalars['String']>;
};


export type MutationRegisterStudentArgs = {
  input: StudentInput;
};


export type MutationRemoveMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSaveApplicantArgs = {
  codigo: Scalars['String'];
  input: ApplicantInput;
};


export type MutationSaveOralResultsArgs = {
  input?: Maybe<OralResults>;
};


export type MutationSaveRegisteringLevelsArgs = {
  course: Scalars['String'];
  levels: Array<Scalars['String']>;
};


export type MutationSaveWorkshopsAttendanceArgs = {
  attendingStudents: Array<AttendingStudent>;
  option_id: Scalars['ID'];
  teacher_id: Scalars['ID'];
};


export type MutationSaveWrittenResultsArgs = {
  input?: Maybe<WrittenResultsInput>;
};


export type MutationSetMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSetMeetLinksArgs = {
  links: Array<MeetLinkInput>;
};


export type MutationSetPlacementHomePageMessageArgs = {
  input: PlacementHomePageMessageInput;
};


export type MutationSetWorkshopLinkArgs = {
  option_id: Scalars['ID'];
  url: Scalars['String'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  id: Scalars['String'];
  meetLink?: Maybe<Scalars['String']>;
};

export type Option = {
  __typename?: 'Option';
  active: Scalars['Boolean'];
  available: Scalars['Boolean'];
  day: Scalars['String'];
  id: Scalars['ID'];
  isTutorial: Scalars['Boolean'];
  teacher: Teacher;
  time: Scalars['String'];
  url: Scalars['String'];
  workshop: Workshop;
  zoom_id?: Maybe<Scalars['String']>;
};

export type OralResults = {
  id: Scalars['ID'];
  nivelFinal: Scalars['Int'];
  nivelOral: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type PlacementHomePageMessageInput = {
  active: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  applicant: Applicant;
  carreras: Array<Carrera>;
  database?: Maybe<Array<Maybe<Scalars['String']>>>;
  getWorkshopsByCategory: Workshop;
  grades: Grades;
  isClosed: Scalars['Boolean'];
  isWorkshopsOpen: Scalars['Boolean'];
  meetLinks: Array<MeetLink>;
  options: Array<Option>;
  paramQuery?: Maybe<Scalars['Boolean']>;
  placementHomePageMessage: HomePageMessage;
  registeringLevels: Array<Scalars['String']>;
  schedule: Schedule;
  section: Section;
  student: Student;
  teacher: Teacher;
  teachers: Array<Teacher>;
  testResults: Array<Maybe<TestResults>>;
  workshops: Array<Workshop>;
};


export type QueryApplicantArgs = {
  codigo: Scalars['ID'];
};


export type QueryDatabaseArgs = {
  ref: Scalars['String'];
};


export type QueryGetWorkshopsByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryGradesArgs = {
  codigo: Scalars['String'];
};


export type QueryParamQueryArgs = {
  param?: Maybe<Scalars['String']>;
};


export type QueryRegisteringLevelsArgs = {
  course: Scalars['String'];
};


export type QueryScheduleArgs = {
  id: Scalars['String'];
};


export type QuerySectionArgs = {
  course: Scalars['String'];
  level: Scalars['Int'];
};


export type QueryStudentArgs = {
  codigo: Scalars['ID'];
};


export type QueryTeacherArgs = {
  id: Scalars['ID'];
};


export type QueryTestResultsArgs = {
  filter?: Maybe<Filter>;
};

export type Question = {
  __typename?: 'Question';
  options: Array<AnswerOption>;
  title: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  email: Scalars['String'];
  genero: Scalars['String'];
  grupo: Scalars['String'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  schedule: Schedule;
  telefono: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  attended: Scalars['Boolean'];
  create_time: Scalars['Date'];
  id: Scalars['ID'];
  option: Option;
  student: Student;
  tutorialReason?: Maybe<Scalars['String']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  chat?: Maybe<Scalars['String']>;
  classroom?: Maybe<Scalars['String']>;
  entry: Scalars['String'];
  group: Scalars['String'];
  serialized: Scalars['String'];
  sesiones?: Maybe<Scalars['String']>;
  teacher: Scalars['String'];
  time?: Maybe<Scalars['String']>;
};


export type ScheduleSerializedArgs = {
  options: SerializedOptions;
};

export type Section = {
  __typename?: 'Section';
  course: Scalars['String'];
  pageInfo?: Maybe<PageInfo>;
  questions: Array<Question>;
};

export type SerializedOptions = {
  group?: Maybe<Scalars['Boolean']>;
  teacher?: Maybe<Scalars['Boolean']>;
  time?: Maybe<Scalars['Boolean']>;
};

export type Student = {
  __typename?: 'Student';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  grupo: Scalars['String'];
  id: Scalars['Int'];
  nivel: Scalars['Int'];
  nombre: Scalars['String'];
  reservation?: Maybe<Reservation>;
  reservationCount: Scalars['Int'];
  reservationLimit: Scalars['Int'];
  telefono: Scalars['String'];
};

export type StudentChangesInput = {
  apellido_materno?: Maybe<Scalars['String']>;
  apellido_paterno?: Maybe<Scalars['String']>;
  carrera?: Maybe<Scalars['String']>;
  ciclo?: Maybe<Scalars['String']>;
  codigo?: Maybe<Scalars['String']>;
  curso?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externo?: Maybe<Scalars['Boolean']>;
  genero?: Maybe<Scalars['String']>;
  grupo?: Maybe<Scalars['String']>;
  nivel?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  telefono?: Maybe<Scalars['String']>;
};

export type StudentInput = {
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  grupo: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID'];
  nombre: Scalars['String'];
  options: Array<TeacherOption>;
};

export type TeacherOption = {
  __typename?: 'TeacherOption';
  available: Scalars['Boolean'];
  day: Scalars['String'];
  id: Scalars['ID'];
  isTutorial: Scalars['Boolean'];
  reservations: Array<Maybe<Reservation>>;
  teacher: Teacher;
  time: Scalars['String'];
  url: Scalars['String'];
  workshop: Workshop;
  zoom_id?: Maybe<Scalars['String']>;
};

export type TestResults = {
  __typename?: 'TestResults';
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  generated_id: Scalars['String'];
  genero: Scalars['String'];
  id: Scalars['ID'];
  institutionalEmail?: Maybe<Scalars['String']>;
  meetLink: Scalars['String'];
  nivelEscrito: Scalars['Int'];
  nivelFinal?: Maybe<Scalars['Int']>;
  nivelOral?: Maybe<Scalars['Int']>;
  nombre: Scalars['String'];
  reubicacion: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type Workshop = {
  __typename?: 'Workshop';
  description: Scalars['String'];
  id: Scalars['Int'];
  levels: Array<Scalars['String']>;
  name: Scalars['String'];
  options: Array<Option>;
};

export type WrittenResultsInput = {
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivelEscrito: Scalars['Int'];
  nombre: Scalars['String'];
  reubicacion: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type FirebaseInput = {
  data: Array<Maybe<Scalars['String']>>;
  ref: Scalars['String'];
};

export type MeetLink = {
  __typename?: 'meetLink';
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type ResetMutationVariables = Exact<{ [key: string]: never; }>;


export type ResetMutation = { __typename?: 'Mutation', resetReservations: boolean };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', isWorkshopsOpen: boolean, teachers: Array<{ __typename?: 'Teacher', id: string, nombre: string }> };

export type ToggleMutationVariables = Exact<{ [key: string]: never; }>;


export type ToggleMutation = { __typename?: 'Mutation', toggleOpenWorkshops: boolean };

export type GetSelectionInfoQueryVariables = Exact<{
  code: Scalars['ID'];
}>;


export type GetSelectionInfoQuery = { __typename?: 'Query', isWorkshopsOpen: boolean, student: { __typename?: 'Student', id: number, codigo: string, nombre: string, nivel: number, reservation?: Maybe<{ __typename?: 'Reservation', option: { __typename?: 'Option', day: string, time: string, url: string, isTutorial: boolean, workshop: { __typename?: 'Workshop', name: string }, teacher: { __typename?: 'Teacher', nombre: string } } }> }, workshops: Array<{ __typename?: 'Workshop', id: number, name: string, description: string, levels: Array<string>, options: Array<{ __typename?: 'Option', id: string, day: string, time: string, url: string, zoom_id?: Maybe<string>, available: boolean, active: boolean, isTutorial: boolean, teacher: { __typename?: 'Teacher', nombre: string } }> }> };

export type SetReservationMutationVariables = Exact<{
  student_id: Scalars['ID'];
  option_id: Scalars['ID'];
}>;


export type SetReservationMutation = { __typename?: 'Mutation', makeWorkshopReservation: { __typename?: 'Reservation', option: { __typename?: 'Option', day: string, time: string, url: string, teacher: { __typename?: 'Teacher', nombre: string }, workshop: { __typename?: 'Workshop', name: string } } } };

export type GetStudentProfileQueryVariables = Exact<{
  code: Scalars['ID'];
}>;


export type GetStudentProfileQuery = { __typename?: 'Query', student: { __typename?: 'Student', id: number, codigo: string, nombre: string, apellido_paterno: string, apellido_materno: string, email: string, telefono: string, nivel: number, reservationCount: number, reservationLimit: number, reservation?: Maybe<{ __typename?: 'Reservation', option: { __typename?: 'Option', day: string, time: string, url: string, workshop: { __typename?: 'Workshop', name: string }, teacher: { __typename?: 'Teacher', nombre: string } } }> } };

export type ReservationsListQueryVariables = Exact<{
  teacher_id: Scalars['ID'];
}>;


export type ReservationsListQuery = { __typename?: 'Query', teacher: { __typename?: 'Teacher', id: string, nombre: string, options: Array<{ __typename?: 'TeacherOption', id: string, day: string, time: string, url: string, workshop: { __typename?: 'Workshop', name: string, id: number }, reservations: Array<Maybe<{ __typename?: 'Reservation', id: string, tutorialReason?: Maybe<string>, attended: boolean, student: { __typename?: 'Student', codigo: string, nombre: string, apellido_paterno: string, apellido_materno: string, email: string, telefono: string, nivel: number, grupo: string } }>> }> } };

export type SaveAttendanceMutationVariables = Exact<{
  attendingStudents: Array<AttendingStudent> | AttendingStudent;
  option_id: Scalars['ID'];
  teacher_id: Scalars['ID'];
}>;


export type SaveAttendanceMutation = { __typename?: 'Mutation', saveWorkshopsAttendance: boolean };

export type SaveWorkshopUrlMutationVariables = Exact<{
  option_id: Scalars['ID'];
  link: Scalars['String'];
}>;


export type SaveWorkshopUrlMutation = { __typename?: 'Mutation', setWorkshopLink: boolean };

export type GetTeacherListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeacherListQuery = { __typename?: 'Query', teachers: Array<{ __typename?: 'Teacher', id: string, nombre: string }> };


export const ResetDocument = gql`
    mutation reset {
  resetReservations
}
    `;
export type ResetMutationFn = Apollo.MutationFunction<ResetMutation, ResetMutationVariables>;

/**
 * __useResetMutation__
 *
 * To run a mutation, you first call `useResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetMutation, { data, loading, error }] = useResetMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetMutation(baseOptions?: Apollo.MutationHookOptions<ResetMutation, ResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetMutation, ResetMutationVariables>(ResetDocument, options);
      }
export type ResetMutationHookResult = ReturnType<typeof useResetMutation>;
export type ResetMutationResult = Apollo.MutationResult<ResetMutation>;
export type ResetMutationOptions = Apollo.BaseMutationOptions<ResetMutation, ResetMutationVariables>;
export const SettingsDocument = gql`
    query settings {
  isWorkshopsOpen
  teachers {
    id
    nombre
  }
}
    `;

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQuery(baseOptions?: Apollo.QueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
      }
export function useSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
        }
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = Apollo.QueryResult<SettingsQuery, SettingsQueryVariables>;
export const ToggleDocument = gql`
    mutation toggle {
  toggleOpenWorkshops
}
    `;
export type ToggleMutationFn = Apollo.MutationFunction<ToggleMutation, ToggleMutationVariables>;

/**
 * __useToggleMutation__
 *
 * To run a mutation, you first call `useToggleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleMutation, { data, loading, error }] = useToggleMutation({
 *   variables: {
 *   },
 * });
 */
export function useToggleMutation(baseOptions?: Apollo.MutationHookOptions<ToggleMutation, ToggleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleMutation, ToggleMutationVariables>(ToggleDocument, options);
      }
export type ToggleMutationHookResult = ReturnType<typeof useToggleMutation>;
export type ToggleMutationResult = Apollo.MutationResult<ToggleMutation>;
export type ToggleMutationOptions = Apollo.BaseMutationOptions<ToggleMutation, ToggleMutationVariables>;
export const GetSelectionInfoDocument = gql`
    query getSelectionInfo($code: ID!) {
  isWorkshopsOpen
  student(codigo: $code) {
    id
    codigo
    nombre
    nivel
    reservation {
      option {
        workshop {
          name
        }
        day
        time
        teacher {
          nombre
        }
        url
        isTutorial
      }
    }
  }
  workshops {
    id
    name
    description
    levels
    options {
      id
      day
      time
      teacher {
        nombre
      }
      url
      zoom_id
      available
      active
      isTutorial
    }
  }
}
    `;

/**
 * __useGetSelectionInfoQuery__
 *
 * To run a query within a React component, call `useGetSelectionInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelectionInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelectionInfoQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetSelectionInfoQuery(baseOptions: Apollo.QueryHookOptions<GetSelectionInfoQuery, GetSelectionInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSelectionInfoQuery, GetSelectionInfoQueryVariables>(GetSelectionInfoDocument, options);
      }
export function useGetSelectionInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSelectionInfoQuery, GetSelectionInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSelectionInfoQuery, GetSelectionInfoQueryVariables>(GetSelectionInfoDocument, options);
        }
export type GetSelectionInfoQueryHookResult = ReturnType<typeof useGetSelectionInfoQuery>;
export type GetSelectionInfoLazyQueryHookResult = ReturnType<typeof useGetSelectionInfoLazyQuery>;
export type GetSelectionInfoQueryResult = Apollo.QueryResult<GetSelectionInfoQuery, GetSelectionInfoQueryVariables>;
export const SetReservationDocument = gql`
    mutation setReservation($student_id: ID!, $option_id: ID!) {
  makeWorkshopReservation(student_id: $student_id, option_id: $option_id) {
    option {
      day
      time
      teacher {
        nombre
      }
      workshop {
        name
      }
      url
    }
  }
}
    `;
export type SetReservationMutationFn = Apollo.MutationFunction<SetReservationMutation, SetReservationMutationVariables>;

/**
 * __useSetReservationMutation__
 *
 * To run a mutation, you first call `useSetReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setReservationMutation, { data, loading, error }] = useSetReservationMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      option_id: // value for 'option_id'
 *   },
 * });
 */
export function useSetReservationMutation(baseOptions?: Apollo.MutationHookOptions<SetReservationMutation, SetReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetReservationMutation, SetReservationMutationVariables>(SetReservationDocument, options);
      }
export type SetReservationMutationHookResult = ReturnType<typeof useSetReservationMutation>;
export type SetReservationMutationResult = Apollo.MutationResult<SetReservationMutation>;
export type SetReservationMutationOptions = Apollo.BaseMutationOptions<SetReservationMutation, SetReservationMutationVariables>;
export const GetStudentProfileDocument = gql`
    query getStudentProfile($code: ID!) {
  student(codigo: $code) {
    id
    codigo
    nombre
    apellido_paterno
    apellido_materno
    email
    telefono
    nivel
    reservation {
      option {
        workshop {
          name
        }
        day
        time
        url
        teacher {
          nombre
        }
      }
    }
    reservationCount
    reservationLimit
  }
}
    `;

/**
 * __useGetStudentProfileQuery__
 *
 * To run a query within a React component, call `useGetStudentProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentProfileQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetStudentProfileQuery(baseOptions: Apollo.QueryHookOptions<GetStudentProfileQuery, GetStudentProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentProfileQuery, GetStudentProfileQueryVariables>(GetStudentProfileDocument, options);
      }
export function useGetStudentProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentProfileQuery, GetStudentProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentProfileQuery, GetStudentProfileQueryVariables>(GetStudentProfileDocument, options);
        }
export type GetStudentProfileQueryHookResult = ReturnType<typeof useGetStudentProfileQuery>;
export type GetStudentProfileLazyQueryHookResult = ReturnType<typeof useGetStudentProfileLazyQuery>;
export type GetStudentProfileQueryResult = Apollo.QueryResult<GetStudentProfileQuery, GetStudentProfileQueryVariables>;
export const ReservationsListDocument = gql`
    query reservationsList($teacher_id: ID!) {
  teacher(id: $teacher_id) {
    id
    nombre
    options {
      id
      day
      time
      url
      workshop {
        name
        id
      }
      reservations {
        id
        student {
          codigo
          nombre
          apellido_paterno
          apellido_materno
          email
          telefono
          nivel
          grupo
        }
        tutorialReason
        attended
      }
    }
  }
}
    `;

/**
 * __useReservationsListQuery__
 *
 * To run a query within a React component, call `useReservationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationsListQuery({
 *   variables: {
 *      teacher_id: // value for 'teacher_id'
 *   },
 * });
 */
export function useReservationsListQuery(baseOptions: Apollo.QueryHookOptions<ReservationsListQuery, ReservationsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationsListQuery, ReservationsListQueryVariables>(ReservationsListDocument, options);
      }
export function useReservationsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationsListQuery, ReservationsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationsListQuery, ReservationsListQueryVariables>(ReservationsListDocument, options);
        }
export type ReservationsListQueryHookResult = ReturnType<typeof useReservationsListQuery>;
export type ReservationsListLazyQueryHookResult = ReturnType<typeof useReservationsListLazyQuery>;
export type ReservationsListQueryResult = Apollo.QueryResult<ReservationsListQuery, ReservationsListQueryVariables>;
export const SaveAttendanceDocument = gql`
    mutation saveAttendance($attendingStudents: [AttendingStudent!]!, $option_id: ID!, $teacher_id: ID!) {
  saveWorkshopsAttendance(
    attendingStudents: $attendingStudents
    option_id: $option_id
    teacher_id: $teacher_id
  )
}
    `;
export type SaveAttendanceMutationFn = Apollo.MutationFunction<SaveAttendanceMutation, SaveAttendanceMutationVariables>;

/**
 * __useSaveAttendanceMutation__
 *
 * To run a mutation, you first call `useSaveAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAttendanceMutation, { data, loading, error }] = useSaveAttendanceMutation({
 *   variables: {
 *      attendingStudents: // value for 'attendingStudents'
 *      option_id: // value for 'option_id'
 *      teacher_id: // value for 'teacher_id'
 *   },
 * });
 */
export function useSaveAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<SaveAttendanceMutation, SaveAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveAttendanceMutation, SaveAttendanceMutationVariables>(SaveAttendanceDocument, options);
      }
export type SaveAttendanceMutationHookResult = ReturnType<typeof useSaveAttendanceMutation>;
export type SaveAttendanceMutationResult = Apollo.MutationResult<SaveAttendanceMutation>;
export type SaveAttendanceMutationOptions = Apollo.BaseMutationOptions<SaveAttendanceMutation, SaveAttendanceMutationVariables>;
export const SaveWorkshopUrlDocument = gql`
    mutation saveWorkshopUrl($option_id: ID!, $link: String!) {
  setWorkshopLink(option_id: $option_id, url: $link)
}
    `;
export type SaveWorkshopUrlMutationFn = Apollo.MutationFunction<SaveWorkshopUrlMutation, SaveWorkshopUrlMutationVariables>;

/**
 * __useSaveWorkshopUrlMutation__
 *
 * To run a mutation, you first call `useSaveWorkshopUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveWorkshopUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveWorkshopUrlMutation, { data, loading, error }] = useSaveWorkshopUrlMutation({
 *   variables: {
 *      option_id: // value for 'option_id'
 *      link: // value for 'link'
 *   },
 * });
 */
export function useSaveWorkshopUrlMutation(baseOptions?: Apollo.MutationHookOptions<SaveWorkshopUrlMutation, SaveWorkshopUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveWorkshopUrlMutation, SaveWorkshopUrlMutationVariables>(SaveWorkshopUrlDocument, options);
      }
export type SaveWorkshopUrlMutationHookResult = ReturnType<typeof useSaveWorkshopUrlMutation>;
export type SaveWorkshopUrlMutationResult = Apollo.MutationResult<SaveWorkshopUrlMutation>;
export type SaveWorkshopUrlMutationOptions = Apollo.BaseMutationOptions<SaveWorkshopUrlMutation, SaveWorkshopUrlMutationVariables>;
export const GetTeacherListDocument = gql`
    query getTeacherList {
  teachers {
    id
    nombre
  }
}
    `;

/**
 * __useGetTeacherListQuery__
 *
 * To run a query within a React component, call `useGetTeacherListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeacherListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeacherListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeacherListQuery(baseOptions?: Apollo.QueryHookOptions<GetTeacherListQuery, GetTeacherListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeacherListQuery, GetTeacherListQueryVariables>(GetTeacherListDocument, options);
      }
export function useGetTeacherListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeacherListQuery, GetTeacherListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeacherListQuery, GetTeacherListQueryVariables>(GetTeacherListDocument, options);
        }
export type GetTeacherListQueryHookResult = ReturnType<typeof useGetTeacherListQuery>;
export type GetTeacherListLazyQueryHookResult = ReturnType<typeof useGetTeacherListLazyQuery>;
export type GetTeacherListQueryResult = Apollo.QueryResult<GetTeacherListQuery, GetTeacherListQueryVariables>;