import type React from 'react';
import { useMemo } from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import type { Employee } from '../../types/Employee';
import {
  EmployeeTableDesktop,
  EmployeeTableMobile,
  NoResults,
} from './components';
import styles from './EmployeeTable.module.scss';

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const isMobile = useIsMobile();

  const TableComponent = useMemo(
    () => (isMobile ? EmployeeTableMobile : EmployeeTableDesktop),
    [isMobile],
  );

  return (
    <div className={styles['employee-table']}>
      <TableComponent employees={employees} />
      {employees.length === 0 && <NoResults />}
    </div>
  );
};

export default EmployeeTable;
