const API_URL = 'https://burger-queen-api-mock-five.vercel.app';
// const API_URL = 'http://localhost:8080';

const getProducts = (token) => fetch(`${API_URL}/products`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const editProduct = async (token, id, newInfo) => fetch(`${API_URL}/products/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(newInfo),
});

const deleteProduct = async (token, id) => fetch(`${API_URL}/products/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const createProduct = async (token, id, name, price, type) => fetch(`${API_URL}/products`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    id,
    name,
    price,
    type,
  }),
});

/*
const createProduct = async (token, id, name, price, type) => {
  if (!name || !price || !type) {
    throw new Error('Por favor, insira todas as informações do novo produto');
  }

  const response = fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      name,
      price,
      type,
    }),
  });

  return response;
};
*/
export {
  getProducts, editProduct, deleteProduct, createProduct,
};
