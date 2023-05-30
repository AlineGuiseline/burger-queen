const API_URL = 'https://burger-queen-api-mock-five.vercel.app';
/*
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
  if (response.status >= 400 && response.status <= 500) {
    // eslint-disable-next-line no-console
    console.log(response);
    throw new Error('Verifique seus dados');
  }
  return response.json();
};
*/

const userLogin = (email, password) => fetch(`${API_URL}/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
  }),
});

export default userLogin;

// headers: são importantes para que eu possa dizer ao app qual o tipo de conteúdo que
// estou passando. No caso, estou informando que é do tipo json

// body: é como se fosse a caixa que estou usando para enviar os dados e pedir para que eles
// sejam adicionados
// o fetch é como se fosse um "telefone", que você usa para se comunicar com o
// back-end pra receber as informações. O /login é como se fosse o número
// a ser discado

// É padrão escrever com letra maiúscula as constantes que são mais importantes no projeto
// Ex.: const API_URL
