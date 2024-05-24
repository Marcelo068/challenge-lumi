import React from 'react';
import styles from './Sidebar.module.css'; // Importando estilos CSS como módulos

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Sidebar</h2>
      <ul className={styles.navLinks}>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
