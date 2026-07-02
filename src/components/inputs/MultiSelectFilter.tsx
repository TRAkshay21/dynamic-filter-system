import { Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import type { SelectOption } from '../../types/filter'

interface MultiSelectFilterProps {
  label: string
  value: Array<string | number>
  options: SelectOption[]
  onChange: (value: Array<string | number>) => void
}

function MultiSelectFilter({ label, value, options, onChange }: MultiSelectFilterProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        multiple
        value={value ?? []}
        onChange={(event) => onChange(event.target.value as Array<string | number>)}
        renderValue={(selected) => (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {(selected as Array<string | number>).map((item) => (
              <Chip key={String(item)} label={String(item)} />
            ))}
          </div>
        )}
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

export default MultiSelectFilter
