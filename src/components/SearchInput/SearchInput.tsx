import SearchIcon from '@/assets/icons/search.svg';
import type React from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Pesquisar',
}) => {
  return (
    <div className={styles['search']}>
      <input
        type='text'
        className={styles['search__input']}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <img src={SearchIcon} className={styles['search__icon']} alt='Search icon' />
    </div>
  );
};

export default SearchInput;
