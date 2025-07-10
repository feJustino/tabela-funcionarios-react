import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EmployeeImage from './EmployeeImage';

describe('EmployeeImage', () => {
  it('deve renderizar imagem com src e alt corretos', () => {
    const props = {
      src: 'https://example.com/joao.jpg',
      alt: 'João Silva',
    };

    render(<EmployeeImage {...props} />);

    const image = screen.getByRole('img', { name: props.alt });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.src);
    expect(image).toHaveAttribute('alt', props.alt);
  });
});
