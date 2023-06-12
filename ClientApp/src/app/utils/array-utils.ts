
export function remove<T>(array: T[], item: T): T[]  {
  const index = array.indexOf(item);
  if (index !== -1)
    return array.splice(index, 1);

  return new Array<T>();  
}