const API_URL = 'https://burger-queen-api-mock-five.vercel.app';

const createOrder = async (orderId, orderResume, clientName, waiterId, token) => fetch(`${API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    id: orderId, // se der algum problema, voltar nesta linha, pq ela foi colocada depois
    userId: waiterId,
    client: clientName,
    products: orderResume,
    status: 'pendente',
    dateEntry: new Date().toLocaleString('pt-BR'),
  }),
});

// export default createOrder;

const showOrders = async (token) => fetch(`${API_URL}/orders`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export { createOrder, showOrders };
