import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input', () => {
  it('deve chamar a função whenChanged ao digitar no campo de e-mail', () => {
    const whenChanged = jest.fn();

    const valueEmail = 'Valor digitado no e-mail';

    render(
      <Input
        value={valueEmail}
        whenChanged={whenChanged}
      />,
    );

    const inputEmail = screen.getByDisplayValue('Valor digitado no e-mail');
    expect(inputEmail).toBeInTheDocument();

    const digitandoEmail = 'teste@teste.com';
    fireEvent.change(inputEmail, { target: { value: digitandoEmail } });

    expect(whenChanged).toHaveBeenCalledTimes(1);
    expect(whenChanged).toHaveBeenCalledWith(digitandoEmail);
  });
});

describe('Input', () => {
  it('deve chamar a função whenChanged ao digitar no campo de senha', () => {
    const whenChanged = jest.fn();

    const valuePassword = 'Valor digitado na senha';

    render(
      <Input
        value={valuePassword}
        whenChanged={whenChanged}
      />,
    );

    const inputSenha = screen.getByDisplayValue('Valor digitado na senha');
    expect(inputSenha).toBeInTheDocument();

    const digitandoSenha = 'senha123';
    fireEvent.change(inputSenha, { target: { value: digitandoSenha } });

    expect(whenChanged).toHaveBeenCalledTimes(1);
    expect(whenChanged).toHaveBeenCalledWith(digitandoSenha);
  });
});
