import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import userLogin from '../../api/users';
import { setItem } from '../../storage/localStorage';
import Home from './Home';

jest.mock('react-router-dom');
jest.mock('../../api/users');
jest.mock('../../storage/localStorage');

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

  render(
    <Home />,
  );
  const email = screen.getByPlaceholderText('email@exemplo.com');
  const password = screen.getByPlaceholderText('●●●●●●');
  const btn = screen.getByText('Entrar');
  userEvent.type(email, 'teste@teste.com');
  userEvent.type(password, 'senha123');

  await waitFor(() => {
    userEvent.click(btn);
  });

  await waitFor(() => {
    expect(userLogin).toHaveBeenCalledTimes(1);
  });
});
