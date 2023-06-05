const API_URL = 'https://burger-queen-api-mock-five.vercel.app';

const createOrder = async (orderResume, clientName, waiterId, token) => fetch(`${API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    userId: waiterId,
    client: clientName,
    products: orderResume,
    status: 'pending',
    dateEntry: new Date().toLocaleString('pt-BR'),
  }),
});

export default createOrder;
