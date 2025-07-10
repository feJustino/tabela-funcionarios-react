import { describe, test, expect } from 'vitest';
import { formatDate, formatPhone } from './formatters';
import { createMockEmployee } from '@/__mocks__/createMockEmployee';

describe('formatters', () => {
  describe('formatDate', () => {
    test('deve formatar datas válidas e inválidas', () => {
      expect(formatDate('2023-12-25T10:30:00Z')).toBe('25/12/2023');

      const mockEmployee = createMockEmployee();
      const formattedDate = formatDate(mockEmployee.admission_date);
      expect(formattedDate).toMatch(/^(14|15)\/01\/2023$/);

      expect(formatDate('invalid-date')).toBe('Invalid Date');
    });
  });

  describe('formatPhone', () => {
    test('deve formatar telefones de 13 dígitos com código do país', () => {
      expect(formatPhone('5551987654321')).toBe('+55 (51) 98765-4321');
      expect(formatPhone('+55 (51) 98765-4321')).toBe('+55 (51) 98765-4321');
    });

    test('deve formatar telefones de 11 dígitos (celular brasileiro)', () => {
      const mockEmployee = createMockEmployee();
      expect(formatPhone(mockEmployee.phone)).toBe('(11) 99999-9999');
    });

    test('deve retornar formato original para casos não suportados', () => {
      expect(formatPhone('123456789')).toBe('123456789');
      expect(formatPhone('')).toBe('');
      expect(formatPhone('()+-. ')).toBe('()+-. ');
    });
  });
});
