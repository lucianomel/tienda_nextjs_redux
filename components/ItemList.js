import React, { useState } from 'react';
import styles from '../styles/ItemList.module.css';
import Modal from './UI/Modal';

function ItemList({ items }) {

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const truncateDescription = (description) => {
    if (description.length > 20) {
      return `${description.substring(0, 20)}...`;
    }
    return description;
  };

  return (
    <div className={styles.itemList}>
      <div className={`${styles.headerRow} ${styles.row}`}>
        <div className={styles.cell}>Descripción</div>
        <div className={styles.cell}>Precio</div>
        <div className={styles.cell}>Imagen</div>
        <div className={styles.cell}>Detalles</div>
      </div>
      {items.map((item, index) => (
        <div className={`${styles.itemRow} ${styles.row}`} key={index}>
          <div className={styles.cell}>{truncateDescription(item.description)}</div>
          <div className={styles.cell}>{item.price}</div>
          <div className={styles.cell}>
            <img className={styles.image} src={item.images_urls[0]} alt={item.description} />
          </div>
          <div className={styles.cell}>
            <button className={styles.button} onClick={() => handleOpenModal(item)}>
              Ver Más
            </button>
          </div>
        </div>
      ))}
      {selectedItem && (
        <Modal isOpen={true} onClose={handleCloseModal} item={selectedItem} />
      )}
    </div>
  );
}

export default ItemList;
