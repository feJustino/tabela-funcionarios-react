import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmployeeTableDesktop from './EmployeeTableDesktop';
import { createMockEmployeeList } from '@/__mocks__/createMockEmployeeList';

// Mock dos formatters
vi.mock('@/utils/formatters', () => ({
  formatDate: vi.fn(date => `Formatted: ${date}`),
  formatPhone: vi.fn(phone => `Formatted: ${phone}`),
}));

// Mock do EmployeeImage
vi.mock('../EmployeeImage/EmployeeImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid='employee-image' />
  ),
}));

describe('EmployeeTableDesktop', () => {
  const mockEmployees = createMockEmployeeList(2);

  it('deve renderizar todos os funcionários', () => {
    render(<EmployeeTableDesktop employees={mockEmployees} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('deve renderizar tabela vazia quando não há funcionários', () => {
    render(<EmployeeTableDesktop employees={[]} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });
});
