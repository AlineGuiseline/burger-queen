import { getItem } from '../storage/localStorage';

const API_URL = 'https://burger-queen-api-mock-five.vercel.app';

const createOrder = async (userId, client, products, dateEntry) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getItem('token')}`,
    },
    body: JSON.stringify({
      userId,
      client,
      products,
      status: 'pending',
      dateEntry,
    }),
  });
  console.log(response);
  return response.json();
};

export default createOrder;
