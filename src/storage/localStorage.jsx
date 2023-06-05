export function setItem(key, value) {
  return localStorage.setItem(key, value);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};
