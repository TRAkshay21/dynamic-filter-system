import { Box, Button, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import type { FilterCondition, FilterField } from '../../types/filter'
import { applyFilters } from '../../utils/filterEngine'
import FilterRow from './FilterRow'

interface FilterBuilderProps<T> {
  fields: FilterField[]
  data: T[]
  onFilteredDataChange: (data: T[]) => void
}

const createCondition = (fieldKey: string): FilterCondition => ({
  id: `${fieldKey}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  field: fieldKey,
  operator: 'equals',
  value: '',
})

function FilterBuilder<T extends Record<string, any>>({
  fields,
  data,
  onFilteredDataChange,
}: FilterBuilderProps<T>) {
  const [conditions, setConditions] = useState<FilterCondition[]>([
    createCondition(fields[0]?.key ?? 'name'),
  ])

  const filteredData = useMemo(() => {
    const activeConditions = conditions.filter((condition) => {
      if (!condition.field) return false
      if (typeof condition.value === 'string' && condition.value.trim() === '') return false
      if (Array.isArray(condition.value) && condition.value.length === 0) return false
      return true
    })

    return applyFilters(data, activeConditions)
  }, [conditions, data])

  useEffect(() => {
    onFilteredDataChange(filteredData)
  }, [filteredData, onFilteredDataChange])

  const updateCondition = (id: string, updated: FilterCondition) => {
    setConditions((current) => current.map((condition) => (condition.id === id ? updated : condition)))
  }

  const addCondition = () => {
    setConditions((current) => [...current, createCondition(fields[0]?.key ?? 'name')])
  }

  const removeCondition = (id: string) => {
    setConditions((current) => current.filter((condition) => condition.id !== id))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Typography variant="h6">Filter Builder</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {conditions.map((condition) => (
          <FilterRow
            key={condition.id}
            fields={fields}
            condition={condition}
            onChange={(updated) => updateCondition(condition.id, updated)}
            onRemove={() => removeCondition(condition.id)}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={addCondition}>
          Add Filter
        </Button>
        <Button variant="contained" onClick={() => setConditions([createCondition(fields[0]?.key ?? 'name')])}>
          Reset
        </Button>
      </Box>
    </Box>
  )
}

export default FilterBuilder
