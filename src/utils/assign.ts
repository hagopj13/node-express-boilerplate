export function assign<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
      target[id] = source[id];
  }
  return target;
}