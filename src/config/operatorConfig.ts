export const OPERATORS = {
  text: [
    { label: "Equals", value: "equals" },
    { label: "Contains", value: "contains" },
    { label: "Starts With", value: "startsWith" },
    { label: "Ends With", value: "endsWith" },
    { label: "Does Not Contain", value: "notContains" },
  ],

  number: [
    { label: "Equals", value: "equals" },
    { label: "Greater Than", value: "gt" },
    { label: "Less Than", value: "lt" },
    { label: "Greater Than or Equal", value: "gte" },
    { label: "Less Than or Equal", value: "lte" },
  ],

  amount: [
    {
      label: "Between",
      value: "between",
    },
  ],

  date: [
    {
      label: "Between",
      value: "between",
    },
  ],

  select: [
    {
      label: "Is",
      value: "is",
    },
    {
      label: "Is Not",
      value: "isNot",
    },
  ],

  multiselect: [
    {
      label: "In",
      value: "in",
    },
    {
      label: "Not In",
      value: "notIn",
    },
  ],

  boolean: [
    {
      label: "Is",
      value: "is",
    },
  ],
};