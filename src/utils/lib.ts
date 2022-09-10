export const capitalizeString = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export const dateParser = (timestamp: string) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

type Workshop = {
  name: string;
  options: {
    id: string;
  }[];
};

export function findWorkshopNameFromOptionId(
  workshops: Workshop[],
  option_id: string
): string | undefined {
  const selected = workshops.find((workshop) =>
    Boolean(workshop.options.find((option) => Boolean(option.id === option_id)))
  );
  return selected ? selected.name : undefined;
}
