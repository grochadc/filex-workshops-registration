import React from "react";
type ReservationCounterProps = {
  current: number;
  total: number;
};
function ReservationCounter(props: ReservationCounterProps) {
  return (
    <div className="flex">
      <div className="text-3xl text-bold mr-4">
        {props.current}/{props.total}
      </div>
      <div className="flex">
        {[...Array(props.total)].map((e, i) => (
          <div
            key={i}
            className={`border rounded-md h-10 w-5 m-0 ${
              i + 1 > props.current ? "bg-blue-300" : "bg-blue-500"
            } `}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ReservationCounter;
