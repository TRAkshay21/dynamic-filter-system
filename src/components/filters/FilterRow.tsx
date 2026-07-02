import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useMemo } from 'react'
import type { FilterCondition, FilterField } from '../../types/filter'
import { OPERATORS } from '../../config/operatorConfig'
import TextFilter from '../inputs/TextFilter'
import NumberFilter from '../inputs/NumberFilter'
import AmountFilter from '../inputs/AmountFilter'
import DateFilter from '../inputs/DateFilter'
import SelectFilter from '../inputs/SelectFilter'
import MultiSelectFilter from '../inputs/MultiSelectFilter'

interface FilterRowProps {
  fields: FilterField[]
  condition: FilterCondition
  onChange: (condition: FilterCondition) => void
  onRemove: () => void
}

const getDefaultOperator = (fieldType: FilterField['type']) => {
  switch (fieldType) {
    case 'text':
      return 'contains'
    case 'number':
      return 'equals'
    case 'amount':
    case 'date':
      return 'between'
    case 'select':
      return 'is'
    case 'multiselect':
      return 'in'
    case 'boolean':
      return 'is'
    default:
      return 'equals'
  }
}

function FilterRow({ fields, condition, onChange, onRemove }: FilterRowProps) {
  const selectedField = useMemo(
    () => fields.find((field) => field.key === condition.field) ?? fields[0],
    [condition.field, fields]
  )

  const operatorOptions = selectedField ? OPERATORS[selectedField.type as keyof typeof OPERATORS] ?? [] : []

  const renderValueInput = () => {
    if (!selectedField) return null

    switch (selectedField.type) {
      case 'text':
        return (
          <TextFilter
            label="Value"
            value={String(condition.value ?? '')}
            onChange={(value) => onChange({ ...condition, value })}
          />
        )
      case 'number':
        return (
          <NumberFilter
            label="Value"
            value={condition.value ?? ''}
            onChange={(value) => onChange({ ...condition, value })}
          />
        )
      case 'amount':
        return (
          <AmountFilter
            label="Value"
            value={condition.value ?? ''}
            onChange={(value) => onChange({ ...condition, value })}
          />
        )
      case 'date':
        return (
          <DateFilter
            label="Value"
            value={Array.isArray(condition.value) && condition.value.length === 2 ? [String(condition.value[0]), String(condition.value[1])] : ['', '']}
            onChange={(value) => onChange({ ...condition, value })}
          />
        )
      case 'select':
        return (
          <SelectFilter
            label="Value"
            value={condition.value ?? ''}
            options={selectedField.options ?? []}
            onChange={(value) => onChange({ ...condition, value })}
          />
        )
      case 'multiselect':
        return (
          <MultiSelectFilter
            label="Value"
            value={Array.isArray(condition.value) ? condition.value : []}
            options={selectedField.options ?? []}
            onChange={(value) => onChange({ ...condition, value })}
          />
        )
      case 'boolean':
        return (
          <FormControl fullWidth>
            <InputLabel>Value</InputLabel>
            <Select
              label="Value"
              value={
                typeof condition.value === 'boolean'
                  ? String(condition.value)
                  : condition.value === 'true' || condition.value === 'Yes' || condition.value === 'yes'
                    ? 'true'
                    : condition.value === 'false' || condition.value === 'No' || condition.value === 'no'
                      ? 'false'
                      : ''
              }
              onChange={(event) => onChange({ ...condition, value: event.target.value === 'true' })}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Field</InputLabel>
          <Select
            label="Field"
            value={condition.field}
            onChange={(event) => {
              const selectedField = fields.find((field) => field.key === event.target.value)
              onChange({
                ...condition,
                field: event.target.value,
                operator: selectedField ? getDefaultOperator(selectedField.type) : condition.operator,
                value: '',
              })
            }}
          >
            {fields.map((field) => (
              <MenuItem key={field.key} value={field.key}>
                {field.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Operator</InputLabel>
          <Select
            label="Operator"
            value={condition.operator}
            onChange={(event) => onChange({ ...condition, operator: event.target.value })}
          >
            {operatorOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flex: 1 }}>{renderValueInput()}</Box>

        <Button color="error" variant="outlined" onClick={onRemove}>
          Remove
        </Button>
      </Box>
    </Box>
  )
}

export default FilterRow
