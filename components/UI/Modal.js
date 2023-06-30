import React, { useEffect, useRef } from 'react';
import styles from '../../styles/Modal.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Modal({ isOpen, onClose, item }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleBackdropClick = (event) => {
      if (event.target === modalRef.current) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleBackdropClick);
    }

    return () => {
      document.removeEventListener('click', handleBackdropClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} ref={modalRef}>
      <div className={styles.modalContent}>
        <Carousel>
          {item.images_urls.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Item ${index + 1}`} />
            </div>
          ))}
        </Carousel>
        <p>Descricion del artículo: {item.info}</p>
        <p>Precio: {item.price}</p>
        
      </div>
    </div>
  );
}

export default Modal;
