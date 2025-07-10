export const createMockEmployee = (overrides = {}) => ({
  id: 1,
  name: 'João Silva',
  job: 'Desenvolvedor Frontend',
  admission_date: '2023-01-15',
  phone: '(11) 99999-9999',
  image: 'https://example.com/joao.jpg',
  ...overrides,
});
