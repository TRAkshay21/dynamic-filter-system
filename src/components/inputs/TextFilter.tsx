import { TextField } from '@mui/material'

interface TextFilterProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function TextFilter({ label, value, onChange }: TextFilterProps) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default TextFilter
