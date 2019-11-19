export function isEmpty(obj: any): boolean {
  return obj && typeof obj === 'object' ? Object.keys(obj).length === 0 : true;
}
export function existIn(key: string | number, item: any[] | any): boolean {
  if (item && typeof item === 'object') {
    if (Array.isArray(item)) {
      return item.indexOf(key) !== -1;
    } else {
      return item[key] !== undefined;
    }
  } else {
    return false;
  }
}
export function path(keys: Array<string | number>, obj: any) {
  let i: number;
  const j: number = Array.isArray(keys) ? keys.length : 0;
  let newObject = { ...obj };

  for (i = 0; i < j; i++) {
    if (existIn(keys[i], newObject)) {
      newObject = newObject[keys[i]];
    } else {
      return null;
    }
  }
  return newObject;
}
export function pathOr(defaultValue: any, keys: Array<string | number>, obj: any) {
  const pathResult = path(keys, obj);
  return pathResult !== null ? pathResult : defaultValue;
}
