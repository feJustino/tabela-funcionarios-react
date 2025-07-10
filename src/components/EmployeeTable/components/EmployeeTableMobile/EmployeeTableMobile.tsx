import type React from 'react';
import { useState } from 'react';
import type { Employee } from '../../../../types/Employee';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import styles from './EmployeeTableMobile.module.scss';

interface EmployeeTableMobileProps {
  employees: Employee[];
}

const EmployeeTableMobile: React.FC<EmployeeTableMobileProps> = ({
  employees,
}) => {
  const [expandedEmployees, setExpandedEmployees] = useState<Set<number>>(
    new Set(),
  );

  const toggleEmployeeDetails = (employeeId: number) => {
    setExpandedEmployees((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(employeeId)) {
        newSet.delete(employeeId);
      } else {
        newSet.add(employeeId);
      }
      return newSet;
    });
  };
  return (
    <div className={styles['employee-table--mobile']}>
      <table className={styles['mobile-table']}>
        <thead>
          <tr>
            <th className={styles['mobile-header__cell']}>
              <h2>FOTO</h2>
            </th>
            <th className={styles['mobile-header__cell']}>
              <h2>NOME</h2>
            </th>
            <th className={`${styles['mobile-header__cell']}`}>
              <span className={styles.dot} />
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              isExpanded={expandedEmployees.has(employee.id)}
              onToggle={toggleEmployeeDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTableMobile;
