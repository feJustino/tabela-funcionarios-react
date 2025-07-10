import { useState, useEffect } from 'react';
import type { Employee } from '../types/Employee';
import { employeeService } from '../services/employeeService';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await employeeService.getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar funcionários. Verifique se o json-server está rodando.');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter(
      employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.includes(searchTerm)
    );

    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  return {
    employees: filteredEmployees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
  };
};
