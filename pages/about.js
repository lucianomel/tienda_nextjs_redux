import React, { useState } from 'react';
import tls from 'tls';
import styles from '../styles/About.module.css';
import Navbar from '@/components/UI/Navbar';
import { useSelector } from 'react-redux';

function About() {
  tls.DEFAULT_ECDH_CURVE = 'auto';
  const data = useSelector((state) => state.data)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setMessageSent(true);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }

    setSubmitting(false);
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre Nosotros</h1>
      <p className={styles.paragraph}>¡Bienvenido a nuestra tienda! {data.store_about_welcome}</p>
      <p className={styles.paragraph}>Visita nuestro punto de recogida en:</p>
      <p className={styles.paragraph}>{data.punto_recogida}</p>
      <h2 className={styles.heading}>Información de Contacto</h2>
      <p className={styles.paragraph}>Email: {data.store_email}</p>
      <h2 className={styles.heading}>Contáctanos</h2>
      <p className={styles.paragraph}>¿Tienes alguna pregunta o consulta? No dudes en contactarnos utilizando el formulario a continuación:</p>
      {messageSent ? (
        <p className={`${styles.paragraph} ${styles.successMessage}`}>Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Mensaje:</label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={styles.textarea}
            />
          </div>
          <button type="submit" disabled={submitting} className={styles.button}>
            {submitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      )}
    </div>
    </>
  );
  
}

export default About;
