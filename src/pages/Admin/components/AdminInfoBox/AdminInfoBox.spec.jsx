import React from 'react';
import {
  render, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminInfoBox from './AdminInfoBox';

describe('AdminInfoBox', () => {
  test('deve chamar a função whenChanged com o valor digitado', () => {
    const whenChangedMock = jest.fn();
    const label = 'Username';
    const type = 'text';
    const value = 'admin';
    const name = 'username';

    const { getByDisplayValue } = render(
      <AdminInfoBox
        label={label}
        type={type}
        value={value}
        whenChanged={whenChangedMock}
        name={name}
      />,
    );

    const input = getByDisplayValue(value);
    const valorDigitado = 'newAdmin';
    fireEvent.change(input, { target: { value: valorDigitado } });

    expect(whenChangedMock).toHaveBeenCalledWith(valorDigitado);
  });
});
