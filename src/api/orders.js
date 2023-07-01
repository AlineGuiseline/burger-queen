const API_URL = 'https://burger-queen-api-mock-five.vercel.app';
// const API_URL = 'http://localhost:8080';

const createOrder = async (orderId, orderResume, clientName, waiterId, token) => fetch(`${API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    id: orderId,
    userId: waiterId,
    client: clientName,
    products: orderResume,
    status: 'pendente',
    dateEntry: new Date(),
  }),
});

const showOrders = async (token) => fetch(`${API_URL}/orders`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const editOrder = async (token, id, newStatus) => fetch(`${API_URL}/orders/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    status: newStatus,
    // dateEntry: new Date().toLocaleString('pt-BR'),
  }),
});

export { createOrder, showOrders, editOrder };
