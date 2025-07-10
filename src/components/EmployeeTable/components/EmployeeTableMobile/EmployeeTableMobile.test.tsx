import { createMockEmployeeList } from '@/__mocks__/createMockEmployeeList';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Employee } from '../../../../types/Employee';
import EmployeeTableMobile from './EmployeeTableMobile';

// Mock do EmployeeCard
vi.mock('../EmployeeCard/EmployeeCard', () => ({
  default: ({
    employee,
    isExpanded,
    onToggle,
  }: {
    employee: Employee;
    isExpanded: boolean;
    onToggle: (id: number) => void;
  }) => (
    <tr data-testid={`employee-card-${employee.id}`}>
      <td>{employee.name}</td>
      <td>{isExpanded ? 'Expandido' : 'Recolhido'}</td>
      <td>
        <button onClick={() => onToggle(employee.id)} data-testid={`toggle-${employee.id}`}>
          Toggle
        </button>
      </td>
    </tr>
  ),
}));

describe('EmployeeTableMobile', () => {
  const mockEmployees = createMockEmployeeList(2);

  it('deve renderizar tabela com funcionários e cabeçalhos', () => {
    render(<EmployeeTableMobile employees={mockEmployees} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('FOTO')).toBeInTheDocument();
    expect(screen.getByText('NOME')).toBeInTheDocument();

    expect(screen.getByTestId('employee-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('employee-card-2')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('deve gerenciar estado de expansão dos funcionários', () => {
    render(<EmployeeTableMobile employees={mockEmployees} />);

    expect(screen.getAllByText('Recolhido')).toHaveLength(2);

    const toggleButton = screen.getByTestId('toggle-1');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Expandido')).toBeInTheDocument();
    expect(screen.getByText('Recolhido')).toBeInTheDocument();
  });

  it('deve renderizar tabela vazia quando não há funcionários', () => {
    render(<EmployeeTableMobile employees={[]} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByTestId(/employee-card-/)).not.toBeInTheDocument();
  });
});
