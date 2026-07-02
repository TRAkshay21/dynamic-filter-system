export const getNestedValue = (
  obj: Record<string, any>,
  path: string
): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};