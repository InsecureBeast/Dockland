
export function remove<T>(array: T[], item: T): T[]  {
  const index = array.indexOf(item);
  if (index !== -1)
    return array.splice(index, 1);

  return new Array<T>();  
}

export function enumToArray<T extends object>(enumObj: T): { key: string, value: T[keyof T] }[] {
  return Object.keys(enumObj)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      key,
      value: enumObj[key as keyof T]
    }));
}