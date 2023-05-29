const API_URL = 'https://burger-queen-api-mock-five.vercel.app';

const getProducts = async (token) => fetch(`${API_URL}/products`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
//   if (response.status >= 400 && response.status <= 500) {
//     console.log(response);
//     // redirecionar para tela de login
//     throw new Error('Realize o login novamente');
//   }
//   return response.json();

export default getProducts;

// achar um jeito de armazenar o token
// try e catch para capturar o erro na tela
