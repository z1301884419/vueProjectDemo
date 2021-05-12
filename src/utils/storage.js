export const setStorage = (key, val) => {
  let strVal = JSON.stringify(val);
  sessionStorage.setItem(key, strVal);
};
export const getStorage = (key) => JSON.parse(sessionStorage.getItem(key));
export const removeStorage = (key) => {
  sessionStorage.removeItem(key)
}