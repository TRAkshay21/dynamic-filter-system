import { Box, TextField } from '@mui/material'

interface DateFilterProps {
  label: string
  value: string | [string, string]
  onChange: (value: string | [string, string]) => void
}

function DateFilter({ label, value, onChange }: DateFilterProps) {
  const values: [string, string] = Array.isArray(value) ? [value[0], value[1]] : ['', '']

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        fullWidth
        type="date"
        label={`${label} (from)`}
        slotProps={{ inputLabel: { shrink: true } }}
        value={values[0] ?? ''}
        onChange={(event) => onChange([event.target.value, values[1]])}
      />
      <TextField
        fullWidth
        type="date"
        label={`${label} (to)`}
        slotProps={{ inputLabel: { shrink: true } }}
        value={values[1] ?? ''}
        onChange={(event) => onChange([values[0], event.target.value])}
      />
    </Box>
  )
}

export default DateFilter
