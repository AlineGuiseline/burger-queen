import React from 'react';
import {
  render, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemOrder from './ItemOrder';

const mockOnClick = jest.fn(); // mock da função onClick

describe('ItemOrder', () => {
  const orderItem = [
    {
      id: 1, name: 'item 1', price: 10, quantity: 2,
    },
    {
      id: 2, name: 'item 2', price: 15, quantity: 3,
    },
  ];

  it('renderiza o componente corretamente', () => {
    render(<ItemOrder orderItem={orderItem} onClick={mockOnClick} />);
  });

  it('exibe corretamente os itens', () => {
    const { getByText } = render(<ItemOrder orderItem={orderItem} onClick={mockOnClick} />);

    // verifica se nomes e preços são exibidos corretamente
    expect(getByText('item 1')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();
    expect(getByText('item 2')).toBeInTheDocument();
    expect(getByText('$45')).toBeInTheDocument();
  });

  it('calcula corretamente o total', () => {
    const { getByText } = render(<ItemOrder orderItem={orderItem} onClick={mockOnClick} />);
    expect(getByText('$65')).toBeInTheDocument();
  });

  it('atualiza a quantidade do item ao clicar nos botões', () => {
    const { getByText } = render(<ItemOrder orderItem={orderItem} onClick={mockOnClick} />);

    // verifica a quantidade inicial
    expect(getByText('2')).toBeInTheDocument();

    // simula clique no botão de adição
    fireEvent.click(getByText('+'));
    expect(getByText('3')).toBeInTheDocument();

    // simula clique no botão de subtração
    fireEvent.click(getByText('-'));
    expect(getByText('2')).toBeInTheDocument();
  });

  it('chama corretamente a função onClick ao clicar no botão', () => {
    const { getByText } = render(<ItemOrder orderItem={orderItem} onClick={mockOnClick} />);
    fireEvent.click(getByText('Enviar para a cozinha'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
