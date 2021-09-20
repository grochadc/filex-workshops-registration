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
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type AttendingStudent = {
  apellido_materno?: Maybe<Scalars['String']>;
  apellido_paterno: Scalars['String'];
  attended: Scalars['Boolean'];
  codigo: Scalars['String'];
  grupo: Scalars['String'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  teacher: Scalars['String'];
  workshop: Scalars['String'];
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

export type Grades = {
  __typename?: 'Grades';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  codigo: Scalars['String'];
  cultural_task: Scalars['String'];
  email: Scalars['String'];
  final: Scalars['String'];
  final_grammar: Scalars['String'];
  final_oral: Scalars['String'];
  listening: Scalars['String'];
  midterm_grammar: Scalars['String'];
  midterm_oral: Scalars['String'];
  mini_project: Scalars['String'];
  nombre: Scalars['String'];
  reading: Scalars['String'];
  workshops: Scalars['String'];
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
  closeExam?: Maybe<CloseExamResponse>;
  databaseSet: Scalars['Int'];
  makeWorkshopReservation: StudentReservation;
  registerStudent: RegisterResponse;
  removeMeetLink?: Maybe<Scalars['Int']>;
  resetReservations: Scalars['Boolean'];
  saveApplicant: ApplicantResponse;
  saveRegisteringLevels: Array<Scalars['String']>;
  saveWorkshopsAttendance: Scalars['Boolean'];
  saveWrittenResults?: Maybe<MutationResponse>;
  setMeetLink?: Maybe<Scalars['Int']>;
  setMeetLinks?: Maybe<Scalars['Int']>;
  setRows: Scalars['Boolean'];
  setWorkshopLink: Scalars['Boolean'];
};


export type MutationDatabaseSetArgs = {
  input?: Maybe<FirebaseInput>;
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


export type MutationSaveRegisteringLevelsArgs = {
  course: Scalars['String'];
  levels: Array<Scalars['String']>;
};


export type MutationSaveWorkshopsAttendanceArgs = {
  input: Array<AttendingStudent>;
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
  links: Array<Maybe<MeetLinkInput>>;
};


export type MutationSetRowsArgs = {
  input?: Maybe<WrittenResultsInput>;
};


export type MutationSetWorkshopLinkArgs = {
  option_id: Scalars['ID'];
  url: Scalars['String'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meetLink?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
};

export type Option = {
  __typename?: 'Option';
  available: Scalars['Boolean'];
  day: Scalars['String'];
  id: Scalars['ID'];
  isTutorial: Scalars['Boolean'];
  teacher_id: Scalars['String'];
  teacher_name: Scalars['String'];
  time: Scalars['String'];
  url: Scalars['String'];
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  applicant: Applicant;
  carreras?: Maybe<Array<Maybe<Carrera>>>;
  database?: Maybe<Array<Maybe<Scalars['String']>>>;
  getWorkshopsByCategory: Workshop;
  grades: Grades;
  isClosed: Scalars['Boolean'];
  logIn: Scalars['Int'];
  logOut: Scalars['Int'];
  meetLinks: Array<Maybe<MeetLink>>;
  options: Array<Option>;
  paramQuery?: Maybe<Scalars['Boolean']>;
  registeringLevels: Array<Scalars['String']>;
  schedule: Schedule;
  section?: Maybe<Section>;
  student: Student;
  teacher: Teacher;
  teachers: Array<Teacher>;
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

export type Question = {
  __typename?: 'Question';
  options?: Maybe<Array<Maybe<AnswerOption>>>;
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
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  codigo: Scalars['String'];
  email: Scalars['String'];
  grupo: Scalars['String'];
  id: Scalars['ID'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  option_id: Scalars['String'];
  telefono: Scalars['String'];
  tutorial_reason?: Maybe<Scalars['String']>;
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
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
  questions?: Maybe<Array<Maybe<Question>>>;
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
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  grupo: Scalars['String'];
  id: Scalars['ID'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  reservation?: Maybe<StudentReservation>;
  telefono: Scalars['String'];
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
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type StudentReservation = {
  __typename?: 'StudentReservation';
  day: Scalars['String'];
  id: Scalars['ID'];
  teacher_id: Scalars['ID'];
  teacher_name: Scalars['String'];
  time: Scalars['String'];
  url: Scalars['String'];
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID'];
  name: Scalars['String'];
  options: Array<TeacherOption>;
};

export type TeacherOption = {
  __typename?: 'TeacherOption';
  day: Scalars['String'];
  id: Scalars['ID'];
  reservations?: Maybe<Array<Reservation>>;
  teacher_id: Scalars['String'];
  teacher_name: Scalars['String'];
  time: Scalars['String'];
  url: Scalars['String'];
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
};

export type Workshop = {
  __typename?: 'Workshop';
  description: Scalars['String'];
  id: Scalars['ID'];
  levels: Array<Scalars['String']>;
  name: Scalars['String'];
  options: Array<Option>;
};

export type WrittenResultsInput = {
  apellido_materno?: Maybe<Scalars['String']>;
  apellido_paterno: Scalars['String'];
  carrera?: Maybe<Scalars['String']>;
  ciclo?: Maybe<Scalars['String']>;
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  nivel_escrito: Scalars['Int'];
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

export type GetSelectionInfoQueryVariables = Exact<{
  code: Scalars['ID'];
}>;


export type GetSelectionInfoQuery = { __typename?: 'Query', student: { __typename?: 'Student', id: string, codigo: string, nombre: string, nivel: string, reservation?: Maybe<{ __typename?: 'StudentReservation', workshop_name: string, day: string, time: string, teacher_name: string, url: string, zoom_id?: Maybe<string> }> }, workshops: Array<{ __typename?: 'Workshop', id: string, name: string, description: string, levels: Array<string>, options: Array<{ __typename?: 'Option', id: string, workshop_id: string, workshop_name: string, day: string, time: string, teacher_name: string, teacher_id: string, url: string, zoom_id?: Maybe<string>, isTutorial: boolean, available: boolean }> }> };

export type SetReservationMutationVariables = Exact<{
  student_id: Scalars['ID'];
  option_id: Scalars['ID'];
  tutorial_reason?: Maybe<Scalars['String']>;
}>;


export type SetReservationMutation = { __typename?: 'Mutation', makeWorkshopReservation: { __typename?: 'StudentReservation', day: string, time: string, teacher_name: string, workshop_name: string, url: string, zoom_id?: Maybe<string> } };

export type ReservationsListQueryVariables = Exact<{
  teacher_id: Scalars['ID'];
}>;


export type ReservationsListQuery = { __typename?: 'Query', teacher: { __typename?: 'Teacher', id: string, name: string, options: Array<{ __typename?: 'TeacherOption', id: string, day: string, time: string, url: string, workshop_name: string, workshop_id: string, reservations?: Maybe<Array<{ __typename?: 'Reservation', id: string, codigo: string, nombre: string, apellido_paterno: string, apellido_materno: string, email: string, telefono: string, nivel: string, grupo: string, tutorial_reason?: Maybe<string> }>> }> } };

export type SaveAttendanceMutationVariables = Exact<{
  students: Array<AttendingStudent> | AttendingStudent;
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


export type GetTeacherListQuery = { __typename?: 'Query', teachers: Array<{ __typename?: 'Teacher', id: string, name: string }> };


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
export const GetSelectionInfoDocument = gql`
    query getSelectionInfo($code: ID!) {
  student(codigo: $code) {
    id
    codigo
    nombre
    nivel
    reservation {
      workshop_name
      day
      time
      teacher_name
      url
      zoom_id
    }
  }
  workshops {
    id
    name
    description
    levels
    options {
      id
      workshop_id
      workshop_name
      day
      time
      teacher_name
      teacher_id
      url
      zoom_id
      isTutorial
      available
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
    mutation setReservation($student_id: ID!, $option_id: ID!, $tutorial_reason: String) {
  makeWorkshopReservation(
    student_id: $student_id
    option_id: $option_id
    tutorial_reason: $tutorial_reason
  ) {
    day
    time
    teacher_name
    workshop_name
    url
    zoom_id
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
 *      tutorial_reason: // value for 'tutorial_reason'
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
export const ReservationsListDocument = gql`
    query reservationsList($teacher_id: ID!) {
  teacher(id: $teacher_id) {
    id
    name
    options {
      id
      day
      time
      url
      workshop_name
      workshop_id
      reservations {
        id
        codigo
        nombre
        apellido_paterno
        apellido_materno
        email
        telefono
        nivel
        grupo
        tutorial_reason
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
    mutation saveAttendance($students: [AttendingStudent!]!, $option_id: ID!, $teacher_id: ID!) {
  saveWorkshopsAttendance(
    input: $students
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
 *      students: // value for 'students'
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
    name
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