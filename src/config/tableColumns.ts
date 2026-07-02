import { GridColDef } from "@mui/x-data-grid";

export const employeeColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },

  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },

  {
    field: "role",
    headerName: "Role",
    flex: 1,
  },

  {
    field: "salary",
    headerName: "Salary",
    flex: 1,
  },

  {
    field: "projects",
    headerName: "Projects",
    flex: 1,
  },

  {
    field: "performanceRating",
    headerName: "Rating",
    flex: 1,
  },

  {
    field: "isActive",
    headerName: "Active",
    flex: 1,

    valueGetter: (_, row) => (row.isActive ? "Yes" : "No"),
  },
];