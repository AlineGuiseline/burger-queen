const API_URL = 'https://burger-queen-api-mock-five.vercel.app';

const getProducts = (token) => fetch(`${API_URL}/products`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

/*
const getProducts = (token) => {
  return fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
*/

export default getProducts;

// achar um jeito de armazenar o token
// try e catch para capturar o erro na tela
