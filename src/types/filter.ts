export type FieldType =
  | "text"
  | "number"
  | "date"
  | "amount"
  | "select"
  | "multiselect"
  | "boolean";

export interface SelectOption {
  label: string;
  value: string | number | boolean;
}

export interface FilterField {
  key: string;

  label: string;

  type: FieldType;

  options?: SelectOption[];
}

export interface FilterCondition {
  id: string;

  field: string;

  operator: string;

  value: any;
}