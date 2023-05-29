import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

it('deve renderizar o botão corretamente', () => {
  render(
    <Button> Entrar </Button>,
  );
  const btn = screen.getByText('Entrar');
  expect(btn).toBeInTheDocument();
  expect(btn).toMatchSnapshot();
});
