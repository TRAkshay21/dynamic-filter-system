import type { FilterField } from '../types/filter'

export const employeeFields: FilterField[] = [
  { key: 'name', label: 'Name', type: 'text' },
  {
    key: 'department',
    label: 'Department',
    type: 'select',
    options: [
      { label: 'Engineering', value: 'Engineering' },
      { label: 'Finance', value: 'Finance' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'HR', value: 'HR' },
      { label: 'Operations', value: 'Operations' },
    ],
  },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'salary', label: 'Salary', type: 'amount' },
  { key: 'joinDate', label: 'Join Date', type: 'date' },
  { key: 'performanceRating', label: 'Performance Rating', type: 'number' },
  { key: 'isActive', label: 'Active', type: 'boolean' },
]