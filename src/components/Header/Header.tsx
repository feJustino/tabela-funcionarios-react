import type React from 'react';
import Logo from '@/assets/Logo.svg';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <img src={Logo} alt="Logo" />
    </header>
  );
};

export default Header;
