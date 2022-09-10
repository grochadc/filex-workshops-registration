import { findWorkshopNameFromOptionId } from "./lib";
const workshops = [
  {
    name: "somename",
    options: [
      {
        id: '1',
      },
    ],
  },
  {
    name: "someothername",
    options: [
      {
        id: '2',
      },
    ],
  },
];

test("finds the correct workshop by option id", () => {
    expect(findWorkshopNameFromOptionId(workshops, '1')).toBe('somename');
});

export {};
