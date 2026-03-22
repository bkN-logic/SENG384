import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import PeopleList from './pages/PeopleList';

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* Navigasyon Çubuğu */}
        <nav style={styles.navbar}>
          <div style={styles.navBrand}>Kişi Yönetim Sistemi</div>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.link}>Kayıt Formu</Link>
            <Link to="/people" style={styles.link}>Kişi Listesi</Link>
          </div>
        </nav>

        {/* Sayfa İçerikleri */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/people" element={<PeopleList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 5%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navBrand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#646cff',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'color 0.3s',
  },
  content: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  }
};

export default App;