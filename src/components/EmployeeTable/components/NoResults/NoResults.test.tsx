import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NoResults from './NoResults';

describe('NoResults', () => {
  it('deve renderizar mensagem padrão quando não especificada', () => {
    render(<NoResults />);

    const message = screen.getByText('Nenhum funcionário encontrado.');
    expect(message).toBeInTheDocument();
  });
});
