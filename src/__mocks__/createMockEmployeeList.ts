import { createMockEmployee } from './createMockEmployee';

const EMPLOYEE_TEMPLATES = [
  {
    name: 'João Silva',
    job: 'Desenvolvedor Frontend',
    admission_date: '2023-01-15',
    phone: '(11) 99999-9999',
    image: 'https://example.com/joao.jpg',
  },
  {
    name: 'Maria Santos',
    job: 'Designer UX/UI',
    admission_date: '2023-02-20',
    phone: '(11) 88888-8888',
    image: 'https://example.com/maria.jpg',
  },
  {
    name: 'Pedro Oliveira',
    job: 'Desenvolvedor Backend',
    admission_date: '2023-03-10',
    phone: '(11) 77777-7777',
    image: 'https://example.com/pedro.jpg',
  },
  {
    name: 'Ana Costa',
    job: 'Product Manager',
    admission_date: '2023-04-05',
    phone: '(11) 66666-6666',
    image: 'https://example.com/ana.jpg',
  },
  {
    name: 'Carlos Lima',
    job: 'QA Engineer',
    admission_date: '2023-05-12',
    phone: '(11) 55555-5555',
    image: 'https://example.com/carlos.jpg',
  },
];

const generateUniqueEmployee = (template: (typeof EMPLOYEE_TEMPLATES)[0], index: number) => {
  const iteration = Math.floor(index / EMPLOYEE_TEMPLATES.length);

  const name = iteration > 0 ? `${template.name} ${iteration + 1}` : template.name;

  const phoneNumber = String(index + 1).padStart(4, '0');
  const phone = template.phone.replace(/\d{4}-\d{4}/, `${phoneNumber}-${phoneNumber}`);

  return createMockEmployee({
    ...template,
    id: index + 1,
    name,
    phone,
  });
};

export const createMockEmployeeList = (count = 3) => {
  if (count <= 0) return [];

  return Array.from({ length: count }, (_, index) => {
    const template = EMPLOYEE_TEMPLATES[index % EMPLOYEE_TEMPLATES.length];
    return generateUniqueEmployee(template!, index);
  });
};
