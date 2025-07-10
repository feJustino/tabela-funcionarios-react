import { createMockEmployeeList } from '@/__mocks__/createMockEmployeeList';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Employee } from '../../types/Employee';
import EmployeeTable from './EmployeeTable';

// Mock do hook useIsMobile
const mockUseIsMobile = vi.fn();
vi.mock('../../hooks/useIsMobile', () => ({
  default: () => mockUseIsMobile(),
}));

// Mock dos componentes filhos
vi.mock('./components', () => ({
  EmployeeTableDesktop: ({ employees }: { employees: Employee[] }) => (
    <div data-testid='desktop-table'>Desktop: {employees.length} funcionários</div>
  ),
  EmployeeTableMobile: ({ employees }: { employees: Employee[] }) => (
    <div data-testid='mobile-table'>Mobile: {employees.length} funcionários</div>
  ),
  NoResults: () => <div data-testid='no-results'>Sem resultados</div>,
}));

describe('EmployeeTable', () => {
  const mockEmployees = createMockEmployeeList(2);

  it('deve renderizar versão desktop quando não é mobile', () => {
    mockUseIsMobile.mockReturnValue(false);

    render(<EmployeeTable employees={mockEmployees} />);

    expect(screen.getByTestId('desktop-table')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-table')).not.toBeInTheDocument();
  });

  it('deve renderizar versão mobile quando é mobile', () => {
    mockUseIsMobile.mockReturnValue(true);

    render(<EmployeeTable employees={mockEmployees} />);

    expect(screen.getByTestId('mobile-table')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-table')).not.toBeInTheDocument();
  });

  it('deve mostrar NoResults quando lista está vazia', () => {
    mockUseIsMobile.mockReturnValue(false);

    render(<EmployeeTable employees={[]} />);

    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });
});
