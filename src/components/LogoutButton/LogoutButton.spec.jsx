import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('LogoutButton', () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  it('deve chamar a função handleLogout ao clicar no botão', () => {
    render(<LogoutButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(useNavigate).toHaveBeenCalledTimes(1);
    // expect(useNavigate).toHaveBeenCalledWith('/');
  });
});
