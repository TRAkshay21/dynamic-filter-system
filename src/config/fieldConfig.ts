import { FilterField } from "../types/filter";

export const employeeFields: FilterField[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
  },

  {
    key: "department",
    label: "Department",
    type: "select",

    options: [
      { label: "Engineering", value: "Engineering" },

      { label: "Finance", value: "Finance" },

      { label: "Marketing", value: "Marketing" },

      { label: "HR", value: "HR" },
    ],
  },

  {
    key: "salary",
    label: "Salary",
    type: "amount",
  },

  {
    key: "joinDate",
    label: "Join Date",
    type: "date",
  },

  {
    key: "isActive",
    label: "Active",
    type: "boolean",
  },
];