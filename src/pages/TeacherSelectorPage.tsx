import React from "react";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { Loading, Error } from "../components/utils";
import { useGetTeacherListQuery } from "../generated/grapqhl";

export const GET_TEACHER_LIST = gql`
  query getTeacherList {
    teachers {
      id
      nombre
    }
  }
`;

const TeacherSelectorPage = () => {
  const { data, error, loading } = useGetTeacherListQuery();
  if (loading) return <Loading />;
  if (error) return <Error e={error} />;
  return (
    <div>
      {data?.teachers.map((teacher) => (
        <p>
          <Link to={`/teacher/${teacher.id}`}>{teacher.nombre}</Link>
        </p>
      ))}
    </div>
  );
};

export default TeacherSelectorPage;
