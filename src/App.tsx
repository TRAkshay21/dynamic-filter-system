import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import { Download, Filter } from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'
import FilterBuilder from './components/filters/FilterBuilder'
import EmployeeTable from './components/table/EmployeeTable'
import { employeeFields } from './config/fieldConfig'
import { employees as mockEmployees } from './data/employees'
import type { Employee } from './types/employee'

function App() {
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(mockEmployees)
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([])
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportScope, setExportScope] = useState<'all' | 'selected'>('all')

  const totalRecords = mockEmployees.length
  const filteredCount = filteredEmployees.length

  const selectedEmployees = useMemo(
    () => filteredEmployees.filter((employee) => selectedEmployeeIds.includes(employee.id)),
    [filteredEmployees, selectedEmployeeIds],
  )

  const summaryChips = useMemo(
    () => [
      { label: `Total records: ${totalRecords}` },
      { label: `Filtered records: ${filteredCount}` },
    ],
    [filteredCount, totalRecords],
  )

  const handleFilteredDataChange = (data: Employee[]) => {
    setFilteredEmployees(data)
    setSelectedEmployeeIds((current) => current.filter((id) => data.some((employee) => employee.id === id)))
  }

  const handleExport = () => {
    const rowsToExport = exportScope === 'selected' ? selectedEmployees : filteredEmployees

    if (!rowsToExport.length) {
      setExportDialogOpen(false)
      return
    }

    const headers = ['Name', 'Department', 'Role', 'Salary', 'Join Date', 'Address', 'Projects', 'Rating', 'Active']
    const rows = rowsToExport.map((employee) => [
      employee.name,
      employee.department,
      employee.role,
      employee.salary,
      employee.joinDate,
      `${employee.address.city}, ${employee.address.state}, ${employee.address.country}`,
      employee.projects,
      employee.performanceRating,
      employee.isActive ? 'Yes' : 'No',
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `employees-${exportScope === 'selected' ? 'selected' : 'filtered'}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
    setExportDialogOpen(false)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #e5e7eb' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Filter color="primary" size={24} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Dynamic Filter Component System
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Configuration-driven filtering for text, numbers, dates, select, and boolean fields.
              </Typography>
            </Box>
          </Box>

          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1 }}>
              <FilterBuilder fields={employeeFields} data={mockEmployees} onFilteredDataChange={handleFilteredDataChange} />
            </Box>
            <Button
              variant="outlined"
              startIcon={<Download size={18} />}
              onClick={() => setExportDialogOpen(true)}
            >
              Export
            </Button>
          </Box>
         
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {summaryChips.map((chip) => (
              <Chip key={chip.label} label={chip.label} color="primary" variant="outlined" />
            ))}
          </Stack>


          <EmployeeTable rows={filteredEmployees} onSelectionChange={setSelectedEmployeeIds} />
        </Box>
      </Paper>

      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Export employees</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" fullWidth>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Choose what to download
            </Typography>
            <RadioGroup value={exportScope} onChange={(event) => setExportScope(event.target.value as 'all' | 'selected')}>
              <FormControlLabel value="all" control={<Radio />} label={`All filtered data (${filteredEmployees.length})`} />
              <FormControlLabel
                value="selected"
                control={<Radio />}
                label={`Selected rows (${selectedEmployees.length})`}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleExport}
            disabled={exportScope === 'selected' && selectedEmployees.length === 0}
          >
            Download CSV
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default App
