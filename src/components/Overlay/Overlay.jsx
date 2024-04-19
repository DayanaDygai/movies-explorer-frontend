import React from 'react';
import styles from './Overlay.module.css'; // Используйте ваш модуль CSS

function Overlay({ isOpen }) {
  const overlayClass = isOpen
    ? `${styles.overlay} ${styles.overlay_visible}`
    : styles.overlay;

  return <div className={overlayClass} />;
}

export default Overlay;
