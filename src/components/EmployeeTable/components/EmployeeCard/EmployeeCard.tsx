import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import ChevronUpIcon from "@/assets/icons/chevron-up.svg?react";
import type { Employee } from "@/types/Employee";
import { formatDate, formatPhone } from "@/utils/formatters";
import type React from "react";
import { useMemo } from "react";
import EmployeeImage from "../EmployeeImage/EmployeeImage";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: Employee;
  isExpanded: boolean;
  onToggle: (employeeId: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  isExpanded,
  onToggle,
}) => {
  const detailRowClassname = useMemo(
    () =>
      isExpanded
        ? styles["employee-card__details-row"]
        : styles["employee-card__details-row--collapsed"],
    [isExpanded]
  );

  const cardClassname = useMemo(
    () =>
      isExpanded ? styles["employee-card"] : styles["employee-card--collapsed"],
    [isExpanded]
  );

  return (
    <>
      <tr className={cardClassname}>
        <td className={styles["employee-card__photo"]}>
          <EmployeeImage
            src={employee.image}
            alt={`Foto de ${employee.name}`}
          />
        </td>
        <td className={styles["employee-card__name"]}>
          <h3>{employee.name}</h3>
        </td>
        <td className={styles["employee-card__action"]}>
          <button
            type="button"
            className={styles["employee-card__toggle-btn"]}
            onClick={() => onToggle(employee.id)}
          >
            {isExpanded ? (
              <ChevronUpIcon className={styles["employee-card__btn-icon"]} />
            ) : (
              <ChevronDownIcon className={styles["employee-card__btn-icon"]} />
            )}
          </button>
        </td>
      </tr>
      <tr className={detailRowClassname}>
        <td colSpan={3} className={styles["employee-card__details"]}>
          <div className={styles["employee-card__detail"]}>
            <h2>Cargo:</h2> <h3>{employee.job}</h3>
          </div>
          <span className={styles["employee-card__detail-divider"]} />
          <div className={styles["employee-card__detail"]}>
            <h2>Data de Admissão:</h2>{" "}
            <h3>{formatDate(employee.admission_date)}</h3>
          </div>
          <span className={styles["employee-card__detail-divider"]} />

          <div className={styles["employee-card__detail"]}>
            <h2>Telefone:</h2> <h3>{formatPhone(employee.phone)}</h3>
          </div>
          <span className={styles["employee-card__detail-divider"]} />
        </td>
      </tr>
    </>
  );
};

export default EmployeeCard;
