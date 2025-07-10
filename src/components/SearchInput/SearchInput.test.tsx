import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('deve renderizar input com valor e placeholder corretos', () => {
    const props = {
      value: 'João',
      onChange: mockOnChange,
      placeholder: 'Digite o nome',
    };

    render(<SearchInput {...props} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('João');
    expect(input).toHaveAttribute('placeholder', 'Digite o nome');
  });

  it('deve chamar onChange quando valor é alterado', () => {
    const props = {
      value: '',
      onChange: mockOnChange,
    };

    render(<SearchInput {...props} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Maria' } });

    expect(mockOnChange).toHaveBeenCalledWith('Maria');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
