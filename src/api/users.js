const API_URL = 'https://burger-queen-api-mock-five.vercel.app/users';

const userLogin = (email, password) => fetch(`${API_URL}/login`, {
  method: 'POST',
  body: JSON.stringify({
    email,
    password,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default userLogin();
