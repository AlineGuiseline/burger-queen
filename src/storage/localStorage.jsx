export function setLocalStorageItem(key, value) {
  return localStorage.setItem(key, value);
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorageItem(key) {
  return localStorage.removeItem(key);
}
