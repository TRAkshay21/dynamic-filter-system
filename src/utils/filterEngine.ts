import dayjs from "dayjs";
import { FilterCondition } from "../types/filter";
import { getNestedValue } from "./getNestedValue";

export const applyFilters = <T extends Record<string, any>>(
  data: T[],
  filters: FilterCondition[]
): T[] => {
  if (!filters.length) return data;

  return data.filter((row) => {
    return filters.every((filter) => {
      const value = getNestedValue(row, filter.field);

      switch (filter.operator) {
        case "equals":
          return (
            String(value).toLowerCase() ===
            String(filter.value).toLowerCase()
          );

        case "contains":
          return String(value)
            .toLowerCase()
            .includes(String(filter.value).toLowerCase());

        case "startsWith":
          return String(value)
            .toLowerCase()
            .startsWith(String(filter.value).toLowerCase());

        case "endsWith":
          return String(value)
            .toLowerCase()
            .endsWith(String(filter.value).toLowerCase());

        case "gt":
          return Number(value) > Number(filter.value);

        case "lt":
          return Number(value) < Number(filter.value);

        case "gte":
          return Number(value) >= Number(filter.value);

        case "lte":
          return Number(value) <= Number(filter.value);

        case "is":
          return value === filter.value;

        case "isNot":
          return value !== filter.value;

        case "between":
          return (
            dayjs(value).isAfter(filter.value[0]) &&
            dayjs(value).isBefore(filter.value[1])
          );

        default:
          return true;
      }
    });
  });
};