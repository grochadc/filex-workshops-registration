import { jest, expect, test } from "@jest/globals";
import { attendanceReducer, ReservationRow } from "..";

test("returns the first row toggled", () => {
  const state = [
    { id: "res_1", attended: false },
    { id: "res_2", attended: false },
    { id: "res_3", attended: false },
  ] as ReservationRow[];

  expect(
    attendanceReducer(state, {
      type: "toggleAttendance",
      payload: { index: 0 },
    })
  ).toMatchObject([
    { id: "res_1", attended: true },
    { id: "res_2", attended: false },
    { id: "res_3", attended: false },
  ]);
});

test("returns the last row toggled", () => {
    const state = [
        { id: "res_1", attended: false },
        { id: "res_2", attended: false },
        { id: "res_3", attended: false },
      ] as ReservationRow[];
      
      expect(attendanceReducer(state, {
        type: "toggleAttendance",
        payload: { index: 2 }
      })).toMatchObject([
        { id: "res_1", attended: false },
        { id: "res_2", attended: false },
        { id: "res_3", attended: true },
      ])
});

test("returns a middle row toggled", () => {
    const state = [
        { id: "res_1", attended: false },
        { id: "res_2", attended: false },
        { id: "res_3", attended: false },
      ] as ReservationRow[];

    expect(attendanceReducer(state, {
        type: 'toggleAttendance',
        payload: {index: 1}
    })).toMatchObject([
        { id: "res_1", attended: false },
        { id: "res_2", attended: true },
        { id: "res_3", attended: false },
      ])
});

test("returns last row toggled when there are only two rows", () => {
  const state = [
    {id: 'res_1', attended: false},
    {id: 'res_2', attended: false}
  ] as ReservationRow[];

  expect(attendanceReducer(state, {
    type: 'toggleAttendance',
    payload: {index: 1}
  })).toMatchObject([
    {id: 'res_1', attended: false},
    {id: 'res_2', attended: true}  
  ])
})
