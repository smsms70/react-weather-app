export function useDate (date) {
  const options = {
    day: "2-digit",
    month: "short",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  return formattedDate;
}
