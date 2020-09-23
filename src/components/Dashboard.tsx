import React, { useEffect, useState } from "react";
import Database from "../dbInterface";

type DashboardProps = {
  teacher: any;
};

const Dashboard: React.FC<DashboardProps> = ({ teacher }) => {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const dbRef = `workshops/${params.get("teacher")}`;
    console.log(dbRef);
    setLoading(true);
    Database.ref(dbRef)
      .once("value")
      .then((snapshot) => {
        setInfo(snapshot.val());
        setLoading(false);
      });
  }, [teacher]);
  return <div>{loading ? <p>Loading...</p> : JSON.stringify(info)}</div>;
};

export default Dashboard;
