import type { Employee } from '../types/employee'

const departments = ['Engineering', 'Finance', 'Marketing', 'HR', 'Operations']
const roles = ['Software Engineer', 'Product Manager', 'Analyst', 'Designer', 'HR Manager', 'Director']

export const employees: Employee[] = Array.from({ length: 60 }, (_, index) => {
  const department = departments[index % departments.length]
  const role = roles[index % roles.length]
  const salary = 60000 + (index % 10) * 5000 + (index % 3) * 1200
  const joinDate = new Date(2020 + (index % 5), (index % 12), (index % 28) + 1)
    .toISOString()
    .slice(0, 10)

  return {
    id: index + 1,
    name: `Employee ${index + 1}`,
    email: `employee${index + 1}@company.com`,
    department,
    role,
    salary,
    joinDate,
    isActive: index % 3 !== 0,
    address: {
      city: ['Seattle', 'Austin', 'Denver', 'Chicago'][index % 4],
      state: 'US',
      country: 'USA',
    },
    projects: 3 + (index % 8),
    lastReview: new Date(2024, (index % 12), (index % 28) + 1).toISOString().slice(0, 10),
    performanceRating: 2 + (index % 5),
  }
})
