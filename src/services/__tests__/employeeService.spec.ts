import { mockFetchEmployees, mockFetchResponse, resetFetchMock } from '@/__mocks__/fetchMock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { employeeService } from '../employeeService';

describe('employeeService', () => {
  beforeEach(() => {
    resetFetchMock();
  });

  afterEach(() => {
    resetFetchMock();
  });

  describe('getEmployees', () => {
    it('deve buscar funcionários com sucesso', async () => {
      const mockEmployees = mockFetchEmployees(3);

      const result = await employeeService.getEmployees();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/employees');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEmployees);
    });

    it('deve lançar erro quando response não é ok', async () => {
      vi.mocked(fetch).mockResolvedValue(mockFetchResponse({}, 404));

      await expect(employeeService.getEmployees()).rejects.toThrow('Failed to fetch employees');
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/employees');
    });
  });
});
