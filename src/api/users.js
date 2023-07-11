const API_URL = 'https://burger-queen-api-mock-five.vercel.app';

const userLogin = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (response.status === 400) {
    throw new Error('Senha incorreta ou usuário não cadastrado!');
  }
  return response.json();
};

const usersList = async (token) => fetch(`${API_URL}/users`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const editUser = async (token, id, newInfo) => fetch(`${API_URL}/users/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(newInfo),
});

const deleteUser = async (token, id) => fetch(`${API_URL}/users/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const createUser = async (token, id, name, email, password, role) => fetch(`${API_URL}/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    id,
    name,
    email,
    password,
    role,
  }),
});

export {
  userLogin, usersList, editUser, deleteUser, createUser,
};

// headers: são importantes para que eu possa dizer ao app qual o tipo de conteúdo que
// estou passando. No caso, estou informando que é do tipo json

// body: é como se fosse a caixa que estou usando para enviar os dados e pedir para que eles
// sejam adicionados
// o fetch é como se fosse um "telefone", que você usa para se comunicar com o
// back-end pra receber as informações. O /login é como se fosse o número
// a ser discado

// É padrão escrever com letra maiúscula as constantes que são mais importantes no projeto
// Ex.: const API_URL
