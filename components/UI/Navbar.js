import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Navbar.module.css';
import { useSelector } from 'react-redux';

function Navbar() {
  const data = useSelector((state) => state.data)
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>
          <span
            className={`${styles.linkText} ${styles.logoLink}`}
            onClick={() => handleNavigation('/')}
          >
            Vintage store
          </span>
        </h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <span
            className={`${styles.linkText} ${
              router.pathname === '/' && styles.activeLink
            }`}
            onClick={() => handleNavigation('/')}
          >
            Inicio
          </span>
        </li>
        <li>
          <span
            className={`${styles.linkText} ${
              router.pathname === '/about' && styles.activeLink
            }`}
            onClick={() => handleNavigation('/about')}
          >
            Acerca de
          </span>
        </li>
        <li>
          <span
            className={`${styles.icon} ${styles.linkText}`}
            onClick={() => handleNavigation('/about')}
          >
            <img src={data.logo_url} width={50} height={50} />
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
