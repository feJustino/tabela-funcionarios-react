import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockEmployeeList } from '@/__mocks__/createMockEmployeeList';
import { employeeService } from '@/services/employeeService';
import { render, screen, waitFor } from '@/tests';
import App from './App';

vi.mock('./services/employeeService', () => ({
  employeeService: {
    getEmployees: vi.fn(),
  },
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o estado de carregamento inicialmente', () => {
    vi.mocked(employeeService.getEmployees).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(createMockEmployeeList(3)), 100),
        ),
    );

    render(<App />);

    expect(screen.getByText('Carregando funcionários...')).toBeInTheDocument();
  });

  it('deve renderizar a lista de funcionários após o carregamento', async () => {
    const mockEmployees = createMockEmployeeList(2);
    vi.mocked(employeeService.getEmployees).mockResolvedValue(mockEmployees);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Funcionários')).toBeInTheDocument();
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('deve renderizar o estado de erro quando a API falhar', async () => {
    const errorMessage =
      'Erro ao carregar funcionários. Verifique se o json-server está rodando.';
    vi.mocked(employeeService.getEmployees).mockRejectedValue(
      new Error(errorMessage),
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
