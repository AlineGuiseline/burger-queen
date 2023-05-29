import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

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
