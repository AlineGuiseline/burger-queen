import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoBoxTitle from './InfoBoxTitle';

describe('InfoBoxTitle', () => {
  it('deve renderizar o título da caixa informativa corretamente', () => {
    const item = 'Café da manhã';

    render(
      <InfoBoxTitle
        item={item}
      />,
    );

    const infoTitle = screen.getByText('Café da manhã');
    expect(infoTitle).toBeInTheDocument();
  });
});
