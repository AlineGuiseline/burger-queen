export function setLocalStorageItem(key, value) {
  return localStorage.setItem(key, value);
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorageItem(key) {
  return localStorage.removeItem(key);
}

// removeItem --> remover o token e o userId
// criar um componente à parte para o ProtectedRoute
