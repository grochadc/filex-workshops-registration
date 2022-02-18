import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

type NavProps = {
  student: {
    codigo: string;
    nombre: string;
  };
};

const Container = tw.div`
    m-0
    border 
    border-black 
    h-10 
    flex 
    flex-col 
    justify-center
`;

function Nav(props: NavProps) {
  return (
    <Container>
      <div className="mx-3">
        <Link to={`/student/${props.student.codigo}`}>
          {props.student.codigo} {props.student.nombre}
        </Link>
      </div>
    </Container>
  );
}

export default Nav;
