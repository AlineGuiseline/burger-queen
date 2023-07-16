import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import userLogin from '../../api/users';
import { setLocalStorageItem } from '../../utils/localStorage';
import Login from './Login';

jest.mock('react-router-dom');
jest.mock('../../api/users');
jest.mock('../../utils/localStorage');

it('deve redirecionar admins à tela de Menu ao autenticar com sucesso', async () => {
  const mockUserLogin = {
    accessToken: 'qualquer-coisa',
    user: {
      role: 'admin',
    },
  };
  userLogin.mockResolvedValueOnce(mockUserLogin); // o que a função vai devolver
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  render(<Login />);

  const email = screen.getByPlaceholderText('email@exemplo.com');
  const password = screen.getByPlaceholderText('●●●●●●');
  const btn = screen.getByText('Entrar');

  // coloca as ações de digitar e clicar dentro de um waitFor
  await waitFor(() => {
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'senha123');
    userEvent.click(btn);
  });

  // como o userLogin chama o setErro, vamos colocar mais um waitFor aqui
  // depois disso, podemos seguir com todos os expects
  await waitFor(() => expect(userLogin).toHaveBeenCalledTimes(1));
  // verifica se o userLogin recebeu o que foi digitado no input
  expect(userLogin).toHaveBeenCalledWith('teste@teste.com', 'senha123');

  // verifica se o setLocalStorageItem foi chamado 1x e com o retorno do userLogin (mockUserLogin)
  expect(setLocalStorageItem).toHaveBeenCalledTimes(1);
  expect(setLocalStorageItem).toHaveBeenCalledWith('token', mockUserLogin.accessToken);

  // verifica se o mockNavigatae foi chamado 1x e redirecionou pra tela de menu
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('/menu');
});
