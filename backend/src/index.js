const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Veritabanı Bağlantısı
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// E-posta Doğrulama Fonksiyonu (Regex)
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ==========================================
// UÇ NOKTALAR (ENDPOINTS) - /api/people
// ==========================================

// 1. GET - Tüm kişileri getir
app.get('/api/people', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM people ORDER BY full_name ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

// 2. GET - Tek bir kişi getir
app.get('/api/people/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM people WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Kişi bulunamadı." });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

// 3. POST - Yeni kişi ekle
app.post('/api/people', async (req, res) => {
  try {
    const { full_name, email } = req.body;

    // Validasyon
    if (!full_name || full_name.trim() === '') {
      return res.status(400).json({ error: "Tam isim (full_name) boş bırakılamaz." });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: "Geçerli bir e-posta adresi giriniz." });
    }

    // Email benzersiz mi kontrolü
    const emailCheck = await pool.query('SELECT * FROM people WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: "EMAIL_ALREADY_EXISTS" });
    }

    // Veritabanına kaydet
    const newPerson = await pool.query(
      'INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *',
      [full_name, email]
    );

    res.status(201).json(newPerson.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

// 4. PUT - Kişi güncelle
app.put('/api/people/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email } = req.body;

    // Validasyon
    if (!full_name || !isValidEmail(email)) {
      return res.status(400).json({ error: "Geçerli bir isim ve e-posta girmelisiniz." });
    }

    // Email başka birine ait mi kontrolü
    const emailCheck = await pool.query('SELECT * FROM people WHERE email = $1 AND id != $2', [email, id]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: "EMAIL_ALREADY_EXISTS" });
    }

    const updatePerson = await pool.query(
      'UPDATE people SET full_name = $1, email = $2 WHERE id = $3 RETURNING *',
      [full_name, email, id]
    );

    if (updatePerson.rows.length === 0) {
      return res.status(404).json({ error: "Güncellenecek kişi bulunamadı." });
    }

    res.status(200).json(updatePerson.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

// 5. DELETE - Kişi sil
app.delete('/api/people/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletePerson = await pool.query('DELETE FROM people WHERE id = $1 RETURNING *', [id]);
    
    if (deletePerson.rows.length === 0) {
      return res.status(404).json({ error: "Silinecek kişi bulunamadı." });
    }
    
    res.status(200).json({ message: "Kişi başarıyla silindi." });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend ${PORT} portunda çalışıyor.`);
});