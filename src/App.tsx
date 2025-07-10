import styles from './App.module.scss';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import Header from './components/Header/Header';
import SearchInput from './components/SearchInput/SearchInput';
import { useEmployees } from './hooks/useEmployees';

function App() {
  const { employees, loading, error, searchTerm, setSearchTerm } =
    useEmployees();

  if (loading) {
    return (
      <div className={styles.app}>
        <div className={styles.app__container}>
          <div className={`${styles.status} ${styles['status--loading']}`}>
            Carregando funcionários...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <div className={styles.app__container}>
          <div className={`${styles.status} ${styles['status--error']}`}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['app']}>
      <Header />

      <div className={styles['app__container']}>
        <div className={styles['app__container-header']}>
          <h1>Funcionários</h1>

          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </div>
        <EmployeeTable employees={employees} />
      </div>
    </div>
  );
}

export default App;
