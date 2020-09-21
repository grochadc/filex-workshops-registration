import React, { useState, useEffect } from "react";

type Student = {
  name: string;
};

type SelectionProps = { code: string };

const Selection: React.FC<any> = ({ code }: SelectionProps) => {
  const [student, setStudent] = useState<Student | undefined>(undefined);
  useEffect(() => {
    let mounted = true
    if(code){
      fetch(`/students/${code}`)
        .then(response => response.json())
        .then(student => {
            if(mounted){
              setStudent(student)
            }
          })
        .catch(console.error);
    }
    function callback() { mounted = false };
    return callback;
  },[code]);
  return <div>{ student ? <>Hello {student.name}!</> : <p>Loading...</p> }</div>;
};

export default Selection;
