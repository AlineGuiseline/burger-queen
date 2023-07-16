import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonAdmin from './ButtonAdmin';

describe('ButtonAdmin', () => {
  it('deve chamar função onClick quando clicar no botão', () => {
    const onClickMock = jest.fn();
    const name = 'Submit';

    const { getByText } = render(
      <ButtonAdmin
        nome={name}
        onClick={onClickMock}
      />,
    );

    const button = getByText(name);
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
