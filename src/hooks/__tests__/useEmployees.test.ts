import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockEmployeeList } from '@/__mocks__/createMockEmployeeList';
import { employeeService } from '@/services/employeeService';
import { useEmployees } from '../useEmployees';

vi.mock('@/services/employeeService', () => ({
  employeeService: {
    getEmployees: vi.fn(),
  },
}));

describe('useEmployees', () => {
  let mockEmployees: ReturnType<typeof createMockEmployeeList>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockEmployees = createMockEmployeeList(3);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useEmployees());

    expect(result.current.employees).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.searchTerm).toBe('');
    expect(typeof result.current.setSearchTerm).toBe('function');
  });

  it('deve buscar funcionários com sucesso', async () => {
    vi.mocked(employeeService.getEmployees).mockResolvedValue(mockEmployees);

    const { result } = renderHook(() => useEmployees());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.employees).toEqual(mockEmployees);
    expect(result.current.error).toBe(null);
    expect(employeeService.getEmployees).toHaveBeenCalledTimes(1);
  });

  it('deve tratar erro ao buscar funcionários', async () => {
    const errorMessage = 'Network error';
    vi.mocked(employeeService.getEmployees).mockRejectedValue(
      new Error(errorMessage),
    );

    const { result } = renderHook(() => useEmployees());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.employees).toEqual([]);
    expect(result.current.error).toBe(
      'Erro ao carregar funcionários. Verifique se o json-server está rodando.',
    );
  });

  it('deve filtrar funcionários por nome, cargo e telefone (case insensitive)', async () => {
    vi.mocked(employeeService.getEmployees).mockResolvedValue(mockEmployees);

    const { result } = renderHook(() => useEmployees());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchTerm('João');
    });
    expect(result.current.employees).toEqual([mockEmployees[0]]);

    act(() => {
      result.current.setSearchTerm('DESIGNER');
    });
    expect(result.current.employees).toEqual([mockEmployees[1]]);
  });

  it('deve retornar todos os funcionários quando termo de busca está vazio ou apenas espaços', async () => {
    vi.mocked(employeeService.getEmployees).mockResolvedValue(mockEmployees);

    const { result } = renderHook(() => useEmployees());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchTerm('João');
    });
    expect(result.current.employees).toEqual([mockEmployees[0]]);

    act(() => {
      result.current.setSearchTerm('');
    });
    expect(result.current.employees).toEqual(mockEmployees);

    act(() => {
      result.current.setSearchTerm('   ');
    });
    expect(result.current.employees).toEqual(mockEmployees);
  });

  it('deve retornar array vazio quando nenhum funcionário corresponde ao termo de busca', async () => {
    vi.mocked(employeeService.getEmployees).mockResolvedValue(mockEmployees);

    const { result } = renderHook(() => useEmployees());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchTerm('FuncionarioInexistente');
    });

    expect(result.current.employees).toEqual([]);
  });
});
