import { TextField } from '@mui/material'

interface NumberFilterProps {
  label: string
  value: number | string
  onChange: (value: number | string) => void
}

function NumberFilter({ label, value, onChange }: NumberFilterProps) {
  return (
    <TextField
      fullWidth
      type="number"
      label={label}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default NumberFilter
