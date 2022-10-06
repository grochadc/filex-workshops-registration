import React from "react";
import gql from "graphql-tag";
import { useParams } from "react-router";
import {
  useFetchTeacherWorkshopsQuery,
  FetchTeacherWorkshopsQueryHookResult,
} from "../../generated/grapqhl";
import { Loading, Error } from "../../components/utils";

import ConnectedOptionAttendanceTable from "../../connected/components/OptionAttendanceTable";

export const fetchTeacherWorkshops = gql`
  query fetchTeacherWorkshops($teacher_id: ID!) {
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
      }
    }
  }
`;

type DataResult = FetchTeacherWorkshopsQueryHookResult["data"];

const AttendancePage = () => {
  const params: { teacherId: string } = useParams();
  const { data, loading, error } = useFetchTeacherWorkshopsQuery({
    variables: { teacher_id: params.teacherId },
  });

  const [localData, setLocalData] = React.useState<DataResult>();
  React.useEffect(() => {
    setLocalData(data);
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error e={error} />;
  if (data && localData)
    return (
      <div>
        <h1 className="text-4xl">{localData.teacher.nombre}'s Dashboard</h1>
        {localData.teacher.options.map((option, index) => (
          <OptionCard option={option} key={option.id} />
        ))}
      </div>
    );
  return <>No DATA fetched! :(</>;
};

type OptionCardProps = {
  option: {
    id: string;
    day: string;
    time: string;
    workshop: {
      name: string;
    };
  };
};
const OptionCard = (props: OptionCardProps) => {
  const [opened, setOpened] = React.useState(false);
  return (
    <>
      <div
        className="border borderd-black p-4 cursor-pointer"
        onClick={() => setOpened(true)}
      >
        <div className="text-2xl">{props.option.workshop.name}</div>
        <span>
          {props.option.day} {props.option.time}
        </span>
      </div>
      <div>
        {opened ? (
          <ConnectedOptionAttendanceTable optionId={props.option.id} />
        ) : null}
      </div>
    </>
  );
};

export default AttendancePage;
