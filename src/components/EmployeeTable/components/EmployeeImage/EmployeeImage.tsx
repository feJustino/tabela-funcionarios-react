import type React from 'react';
import styles from './EmployeeImage.module.scss';

interface EmployeeImageProps {
  src: string;
  alt: string;
}

const EmployeeImage: React.FC<EmployeeImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles['employee-image']} />;
};

export default EmployeeImage;
