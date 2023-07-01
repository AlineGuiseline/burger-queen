import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoBox from './InfoBox';

describe('InfoBox', () => {
  it('deve renderizar o o bloco de informações corretamente', () => {
    const item = 'Sanduíche de queijo com presunto';
    const valor = '10,00';

    render(
      <InfoBox
        item={item}
        valor={valor}
      />,
    );

    const itemText = screen.getByText('Sanduíche de queijo com presunto');
    expect(itemText).toBeInTheDocument();

    const valueText = screen.getByText('10,00');
    expect(valueText).toBeInTheDocument();
  });
});
