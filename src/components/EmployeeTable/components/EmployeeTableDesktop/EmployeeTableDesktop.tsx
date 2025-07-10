import type React from 'react';
import type { Employee } from '@/types/Employee';
import { formatDate, formatPhone } from '@/utils/formatters';
import EmployeeImage from '../EmployeeImage/EmployeeImage';
import styles from './EmployeeTableDesktop.module.scss';

interface EmployeeTableDesktopProps {
  employees: Employee[];
}

const EmployeeTableDesktop: React.FC<EmployeeTableDesktopProps> = ({
  employees,
}) => {
  return (
    <table className={styles['employee-table__table']}>
      <thead>
        <tr>
          <th className={styles['employee-table__header']}>
            <h2>FOTO</h2>
          </th>
          <th className={styles['employee-table__header']}>
            <h2>NOME</h2>
          </th>
          <th className={styles['employee-table__header']}>
            <h2>CARGO</h2>
          </th>
          <th className={styles['employee-table__header']}>
            <h2>DATA DE ADMISSÃO</h2>
          </th>
          <th className={styles['employee-table__header']}>
            <h2>TELEFONE</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className={styles['employee-table__row']}>
            <td
              className={`${styles['employee-table__cell']} ${styles['employee-table__cell--image']}`}
            >
              <EmployeeImage
                src={employee.image}
                alt={`Foto de ${employee.name}`}
              />
            </td>
            <td
              className={`${styles['employee-table__cell']} ${styles['employee-table__cell--name']}`}
            >
              <h3>{employee.name}</h3>
            </td>
            <td
              className={`${styles['employee-table__cell']} ${styles['employee-table__cell--job']}`}
            >
              <h3>{employee.job}</h3>
            </td>
            <td
              className={`${styles['employee-table__cell']} ${styles['employee-table__cell--date']}`}
            >
              <h3>{formatDate(employee.admission_date)}</h3>
            </td>
            <td
              className={`${styles['employee-table__cell']} ${styles['employee-table__cell--phone']}`}
            >
              <h3>{formatPhone(employee.phone)}</h3>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTableDesktop;
