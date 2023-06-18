const API_URL = 'https://burger-queen-api-mock-five.vercel.app';
// const API_URL = 'http://localhost:8080';

const getStock = (token) => fetch(`${API_URL}/stock`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default getStock;
