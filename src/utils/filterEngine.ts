import type { FilterCondition } from '../types/filter'
import { getNestedValue } from './getNestedValue'

const normalizeBooleanValue = (value: unknown) => {
  if (typeof value === 'boolean') return value

  if (typeof value === 'string') {
    const normalizedValue = value.trim().toLowerCase()

    if (['true', 'yes', 'y', '1', 'active'].includes(normalizedValue)) return true
    if (['false', 'no', 'n', '0', 'inactive'].includes(normalizedValue)) return false
  }

  return value
}

const matchesCondition = <T extends Record<string, any>>(row: T, condition: FilterCondition) => {
  const value = getNestedValue(row, condition.field)
  const normalizedValue = normalizeBooleanValue(value)
  const normalizedConditionValue = normalizeBooleanValue(condition.value)

  if (typeof normalizedValue === 'boolean' && typeof normalizedConditionValue === 'boolean') {
    return condition.operator === 'isNot' ? normalizedValue !== normalizedConditionValue : normalizedValue === normalizedConditionValue
  }

  switch (condition.operator) {
    case 'equals':
      return String(value).toLowerCase() === String(condition.value).toLowerCase()
    case 'contains':
      return String(value).toLowerCase().includes(String(condition.value).toLowerCase())
    case 'startsWith':
      return String(value).toLowerCase().startsWith(String(condition.value).toLowerCase())
    case 'endsWith':
      return String(value).toLowerCase().endsWith(String(condition.value).toLowerCase())
    case 'notContains':
      return !String(value).toLowerCase().includes(String(condition.value).toLowerCase())
    case 'gt':
      return Number(value) > Number(condition.value)
    case 'lt':
      return Number(value) < Number(condition.value)
    case 'gte':
      return Number(value) >= Number(condition.value)
    case 'lte':
      return Number(value) <= Number(condition.value)
    case 'is':
      return value === condition.value
    case 'isNot':
      return value !== condition.value
    case 'between': {
      const [from, to] = Array.isArray(condition.value) ? condition.value : [condition.value, condition.value]

      if (typeof value === 'string' && value.includes('-')) {
        const targetDate = new Date(value)
        const fromDate = from ? new Date(from) : null
        const toDate = to ? new Date(to) : null

        if (fromDate && toDate) return targetDate >= fromDate && targetDate <= toDate
        if (fromDate) return targetDate >= fromDate
        if (toDate) return targetDate <= toDate
        return true
      }

      const min = Number(from)
      const max = Number(to)

      if (Number.isNaN(min) && Number.isNaN(max)) return true
      if (Number.isNaN(min)) return Number(value) <= max
      if (Number.isNaN(max)) return Number(value) >= min

      return Number(value) >= min && Number(value) <= max
    }
    case 'in':
      return Array.isArray(condition.value) && condition.value.includes(value)
    case 'notIn':
      return Array.isArray(condition.value) && !condition.value.includes(value)
    default:
      return true
  }
}

export const applyFilters = <T extends Record<string, any>>(data: T[], filters: FilterCondition[]): T[] => {
  if (!filters.length) return data

  const groupedConditions = filters.reduce<Record<string, FilterCondition[]>>((acc, condition) => {
    if (!condition.field) return acc
    const key = condition.field
    acc[key] = acc[key] ? [...acc[key], condition] : [condition]
    return acc
  }, {})

  return data.filter((row) =>
    Object.values(groupedConditions).every((group) => group.some((condition) => matchesCondition(row, condition)))
  )
}