import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import type { SelectOption } from '../../types/filter'

interface SelectFilterProps {
  label: string
  value: string | number
  options: SelectOption[]
  onChange: (value: string | number) => void
}

function SelectFilter({ label, value, options, onChange }: SelectFilterProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value as string | number)}
      >
        {options.map((option) => (
          <MenuItem key={String(option.value)} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectFilter
