import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

// Mock do SVG
vi.mock('@/assets/Logo.svg', () => ({
  default: 'mocked-logo.svg',
}));

describe('Header', () => {
  it('deve renderizar o header corretamente', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
