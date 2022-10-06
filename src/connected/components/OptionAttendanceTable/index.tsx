import React from "react";
import gql from "graphql-tag";
import {
  useReactTable,
  //@ts-ignore
  createColumnHelper,
  //@ts-ignore
  ColumnDef,
  //@ts-ignore
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  useFetchReservationsByOptionIdQuery,
  useSaveAttendanceMutation
} from "../../../generated/grapqhl";

import { Loading, Error, Button } from "../../../components/utils";

export const fetchReservationsByOptionId = gql`
  query fetchReservationsByOptionId($optionId: ID!) {
    reservations(optionId: $optionId) {
      id
      student {
        id
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
`;

export const saveReservationsFromOption = gql`
  mutation savereservationsFromOption($reservations: [ReservationInput!]!){
    saveWorkshopsAttendance(attendingStudents: $reservations)
  }
`;

type OptionAttendanceProps = {
  optionId: string;
};

const OptionAttendanceTable = (props: OptionAttendanceProps) => {
  const { data, loading, error } = useFetchReservationsByOptionIdQuery({
    variables: { optionId: props.optionId },
  });
  const [saveAttendance, {error: saveAttendanceError}] = useSaveAttendanceMutation({
    onError: (e) => {
      alert('There was an error saving attendance.')
      console.error(e)
    },
    onCompleted: (data) => alert('Attendance saved succesfully!')
  });

  const handleSaveAttendance = (attendance: ReservationRow[]) => {
    
    const shavedAttendance = attendance.map((row) => ({id: row.id, attended: row.attended}));
    saveAttendance({
      variables: {
        attendingStudents: shavedAttendance
      }
    });

  }
  if(saveAttendanceError) return <Error e={saveAttendanceError} />;
  if (loading) return <Loading />;
  if (error) return <Error e={error} />;
  if (data?.reservations) {
    const reservations = data.reservations.map((reservation) => {
      return {
        ...reservation,
        ...reservation?.student,
        student_id: reservation?.student.id,
        id: reservation?.id,
      };
    });
    //@ts-ignore
    return <OptionAttendanceView reservations={reservations} onSubmit={handleSaveAttendance} />;
  }
  return <>Sorry! No DATA was fetched :(</>;
};

export type ReservationRow = {
  id: string;
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nivel: number;
  email: string;
  telefono: string;
  grupo: string;
  attended: boolean;
};

type OptionAttendanceViewProps = {
  reservations: ReservationRow[];
  onSubmit: (reservations: ReservationRow[]) => void,
};

export const attendanceReducer = (
  state: ReservationRow[],
  action: { type: "toggleAttendance"; payload: { index: number } }
): ReservationRow[] => {
  const chosenIndex = action.payload.index;
  const currentRow = state[chosenIndex];
  switch (action.type) {
    case "toggleAttendance":
      if (chosenIndex === 0)
        return [
          { ...state[0], attended: !state[0].attended },
          ...state.slice(1),
        ];
      if (chosenIndex === state.length - 1)
        return [
          ...state.slice(0, state.length - 1),
          { ...currentRow, attended: !currentRow.attended },
        ];
      return [
        ...state.slice(0, chosenIndex),
        { ...currentRow, attended: !currentRow.attended },
        ...state.slice(chosenIndex + 1),
      ];
    default:
      return state;
  }
};

const OptionAttendanceView = (props: OptionAttendanceViewProps) => {
  const [localReservations, dispatch] = React.useReducer(
    attendanceReducer,
    props.reservations
  );

  const columnHelper = createColumnHelper<ReservationRow>();
  const columns: ColumnDef<ReservationRow, any>[] = [
    columnHelper.display({
      id: "rowNum",
      header: "No",
      cell: (props) => (
        <div className="text-center w-full">{props.row.index + 1}</div>
      ),
    }),
    columnHelper.accessor("attended", {
      header: "Present",
      cell: (info) => (
        <div className="text-center w-full">
          <input
            type="checkbox"
            checked={info.getValue()}
            onChange={() =>
              dispatch({
                type: "toggleAttendance",
                payload: { index: info.row.index },
              })
            }
          />
        </div>
      ),
    }),
    columnHelper.accessor("codigo", {
      header: "Codigo",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor(
      (row) => `${row.nombre} ${row.apellido_paterno} ${row.apellido_materno}`,
      {
        header: "Nombre",
        cell: (info) => info.getValue(),
      }
    ),
    columnHelper.accessor("email", {
      header: "Correo",
      cell: (info) => (
        <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a>
      ),
    }),
    columnHelper.accessor("telefono", {
      header: "Telefono",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nivel", {
      header: "Nivel",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("grupo", {
      header: "Grupo",
      cell: (info) => info.getValue(),
    }),
  ];
  const table = useReactTable({
    columns,
    data: localReservations,
    getCoreRowModel: getCoreRowModel(),
  });
  if (localReservations.length < 1)
    return <div>No hay reservaciones para este taller.</div>;
  return (
    <div>
      <table className="w-full m-3">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b-4">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-slate-100 odd:bg-white">
              {row.getVisibleCells().map((cell) => (
                <td key="cell.id" className="py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => props.onSubmit(localReservations)}>Submit</Button>
    </div>
  );
};

export default OptionAttendanceTable;
