import { useQuery } from "@tanstack/react-query";

export function useFetch({
  startYear,
  endYear,
}: {
  startYear?: string;
  endYear?: string;
}) {
  return useQuery({
    queryKey: ["data", startYear, endYear].filter(Boolean),
    queryFn: () =>
      fetch(
        `https://api.worldbank.org/v2/country/US/indicator/SP.POP.TOTL?date=${startYear}:${endYear}&format=json`,
      ).then((res) => res.json()),
  });
}
