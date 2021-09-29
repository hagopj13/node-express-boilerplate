/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = <T extends {}, K extends readonly string[]>(object: T, keys: K) => {
  let newObject = {} as Pick<T, K[number]>;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
};
