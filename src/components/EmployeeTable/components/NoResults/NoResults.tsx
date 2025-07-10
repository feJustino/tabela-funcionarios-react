import type React from 'react';
import styles from './NoResults.module.scss';

interface NoResultsProps {
  message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({
  message = 'Nenhum funcionário encontrado.',
}) => {
  return <div className={styles['no-results']}>{message}</div>;
};

export default NoResults;
