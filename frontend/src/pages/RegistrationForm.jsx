import React, { useState } from 'react';
import { createPerson } from '../api';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side Validation
    if (!formData.full_name || !formData.email) {
      setStatus({ type: 'error', message: 'Tüm alanlar zorunludur!' });
      return;
    }
    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Geçersiz e-posta formatı!' });
      return;
    }

    try {
      await createPerson(formData);
      setStatus({ type: 'success', message: 'Kişi başarıyla kaydedildi!' });
      setFormData({ full_name: '', email: '' }); // Formu temizle
    } catch (err) {
      const errorMsg = err.response?.data?.error === 'EMAIL_ALREADY_EXISTS' 
        ? 'Bu e-posta zaten kullanımda!' 
        : 'Sunucu hatası oluştu.';
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  return (
    <div style={styles.card}>
      <h2>Kişi Kayıt Formu</h2>
      {status.message && (
        <div style={{ ...styles.alert, backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da' }}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Tam İsim"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Kaydet</button>
      </form>
    </div>
  );
};

const styles = {
  card: { padding: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  alert: { padding: '10px', borderRadius: '4px', marginBottom: '15px', color: '#155724' }
};

export default RegistrationForm;