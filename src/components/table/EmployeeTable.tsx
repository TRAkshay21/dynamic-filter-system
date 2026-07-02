import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'
import type { Employee } from '../../types/employee'

interface EmployeeTableProps {
  rows: Employee[]
  onSelectionChange?: (selectedIds: number[]) => void
}

function NoResultsOverlay() {
  return (
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h6">No results</Typography>
      <Typography color="text.secondary">Try adjusting the filters to see more records.</Typography>
    </Box>
  )
}

function EmployeeTable({ rows, onSelectionChange }: EmployeeTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 })
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set<number>() })

  useEffect(() => {
    setRowSelectionModel((current) => ({
      type: current.type,
      ids: new Set(Array.from(current.ids).filter((id) => rows.some((row) => row.id === id))),
    }))
  }, [rows])

  const columns = useMemo<GridColDef<Employee>[]>(() => [
    { field: 'name', headerName: 'Name', flex: 1, sortable: true },
    { field: 'department', headerName: 'Department', flex: 1, sortable: true },
    { field: 'role', headerName: 'Role', flex: 1, sortable: true },
    {
      field: 'salary',
      headerName: 'Salary',
      flex: 1,
      sortable: true,
      valueGetter: (_, row) => row.salary,
      renderCell: (params) => `INR ${Number(params.row.salary).toLocaleString()}`,
    },
    {
      field: 'joinDate',
      headerName: 'Join Date',
      flex: 1,
      sortable: true,
      valueGetter: (_, row) => row.joinDate,
      renderCell: (params) => params.row.joinDate,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      sortable: true,
      valueGetter: (_, row) => `${row.address.city}, ${row.address.state}, ${row.address.country}`,
      renderCell: (params) => params.row.address.city,
    },
    { field: 'projects', headerName: 'Projects', flex: 1, sortable: true },
    { field: 'performanceRating', headerName: 'Rating', flex: 1, sortable: true },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      sortable: true,
      valueGetter: (_, row) => (row.isActive ? 'Yes' : 'No'),
    },
  ], [])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(model) => {
          const nextSelection = model && typeof model === 'object' && 'ids' in model
            ? model
            : { type: 'include' as const, ids: new Set<number>() }

          const numericSelection = Array.from(nextSelection.ids).filter((id): id is number => typeof id === 'number')

          setRowSelectionModel(nextSelection)
          onSelectionChange?.(numericSelection)
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)}
        pageSizeOptions={[10]}
        rowCount={rows.length}
        disableColumnMenu
        disableColumnResize={true}
        slots={{ noRowsOverlay: NoResultsOverlay }}
      />
    </div>
  )
}

export default EmployeeTable
