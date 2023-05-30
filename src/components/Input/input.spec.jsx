import React from 'react';
// import { render, screen } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import Input from './Input';
/*
it('Deve renderizar o campo corretamente com um valor e disparar uma ação ao modificar', () => {
  const whenChanged = jest.fn();
  render(
    <Input value="Valor Digitado" whenChanged={whenChanged} />,
  );
  const input = screen.getByDisplayValue('Valor Digitado');
  expect(input).toBeInTheDocument();

  const digitando = 'Novo valor';
  userEvent.type(input, digitando);
  expect(whenChanged).toHaveBeenCalledTimes(digitando.length);
  expect(whenChanged).toHaveBeenCalledWith(digitando);
});
*/

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

/*
it('deve renderizar o campo corretamente com um valor e disparar uma ação ao modificar', () => {
  const onChange = jest.fn();
  render(
    <Input value="valorDigitado" onChange={onChange} />,
  );
  const input = screen.getByDisplayValue('valorDigitado');
  expect(input).toBeInTheDocument();

  const digitando = 'Novo Valor';
  userEvent.type(input, digitando);
  expect(onChange).toHaveBeenCalled(digitando.length);
  expect(onChange).toBeCalledWith(digitando);
});
*/
