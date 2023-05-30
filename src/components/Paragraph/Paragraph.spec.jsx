import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Paragraph from './Paragraph';

describe('Paragraph', () => {
  it('deve renderizar o parágrafo corretamente', () => {
    const text = 'Ocorreu algum erro, confira seus dados';

    render(
      <Paragraph
        text={text}
      />,
    );

    const paragraphText = screen.getByText('Ocorreu algum erro, confira seus dados');
    expect(paragraphText).toBeInTheDocument();
  });
});
