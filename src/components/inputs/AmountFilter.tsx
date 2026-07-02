import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

interface AmountFilterProps {
  label: string
  value: number | string | [number | string, number | string]
  onChange: (value: number | string | [number | string, number | string]) => void
}

const salaryRanges: Array<{ label: string; value: [number, number] }> = [
  { label: 'Below 60k', value: [0, 60000] },
  { label: '60k - 70k', value: [60000, 70000] },
  { label: '70k - 80k', value: [70000, 80000] },
  { label: '80k - 90k', value: [80000, 90000] },
  { label: '90k - 100k', value: [90000, 100000] },
  { label: '100k+', value: [100000, 1000000] },
]

function AmountFilter({ label, value, onChange }: AmountFilterProps) {
  const getSelectedLabel = () => {
    if (Array.isArray(value)) {
      const matchingRange = salaryRanges.find(
        (range) => range.value[0] === Number(value[0]) && range.value[1] === Number(value[1]),
      )
      return matchingRange?.label ?? ''
    }
    return typeof value === 'string' ? value : ''
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={getSelectedLabel()}
        onChange={(event) => {
          const selected = salaryRanges.find((range) => range.label === event.target.value)
          onChange(selected?.value ?? [0, 0])
        }}>
            
        {salaryRanges.map((range) => (
          <MenuItem key={range.label} value={range.label}>
            {range.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AmountFilter
