import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { useSettingsQuery, useToggleMutation } from "../../generated/grapqhl";
import { Error } from "../../components/utils";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

const StyledAnchor = tw.a`underline text-blue-500 hover:text-blue-300`;
const Card = tw.div`border rounded-sm shadow-sm p-3`;

const Dashboard = (props: any) => {
  const [resetReservations] = useMutation(RESET_RESERVATIONS, {
    onCompleted: () => alert("Platform reset successful."),
  });
  const [openWorkshops] = useToggleMutation();
  const [open, setOpen] = React.useState(false);
  const { data: settingsData, error, loading } = useSettingsQuery();
  React.useEffect(() => {
    if (settingsData) setOpen(settingsData.isWorkshopsOpen);
  }, [settingsData]);
  const handleToggleChange = () => {
    openWorkshops();
    setOpen(!open);
  };
  if (loading) return <>Loading...</>;
  if (error) return <Error e={error} />;
  if (settingsData) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
        <div className="flex flex-col justify-around">
          <Card className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold">Platform</h2>
            <button
              className="bg-blue-500 rounded text-white p-2 m-1"
              onClick={() => resetReservations()}
            >
              Erase all reservations
            </button>
            <button
              className="bg-blue-500 rounded text-white p-2 m-1"
              onClick={handleToggleChange}
            >
              {open ? "Close platform" : "Open platform"}
            </button>
          </Card>
          <Card>
            <h2 className="font-bold text-2xl">Teacher's Links</h2>
            <ol>
              {settingsData.teachers.map((teacher) => (
                <li>
                  <Link to={`/attendance/${teacher.id}`} component={StyledAnchor}>
                    {teacher.nombre}
                  </Link>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    );
  }
  return null;
};

export const RESET_RESERVATIONS = gql`
  mutation reset {
    resetReservations
  }
`;

export const getSettings = gql`
  query settings {
    isWorkshopsOpen
    teachers {
      id
      nombre
    }
  }
`;

export const TOGGLE_OPEN = gql`
  mutation toggle {
    toggleOpenWorkshops
  }
`;

export default Dashboard;
