import React, { useEffect, useState } from 'react';
import { getPeople, deletePerson, updatePerson } from '../api';

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  const loadPeople = async () => {
    try {
      const response = await getPeople();
      setPeople(response.data);
    } catch (err) {
      console.error("Veriler alınamadı", err);
    }
  };

  useEffect(() => { loadPeople(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
      await deletePerson(id);
      loadPeople();
    }
  };

  const handleEdit = async (person) => {
    const newName = prompt("Yeni ismi girin:", person.full_name);
    const newEmail = prompt("Yeni e-postayı girin:", person.email);
    
    if (newName && newEmail) {
      try {
        await updatePerson(person.id, { full_name: newName, email: newEmail });
        loadPeople();
      } catch (err) {
        alert("Güncelleme sırasında hata oluştu veya e-posta zaten var.");
      }
    }
  };

  return (
    <div style={styles.card}>
      <h2>Kayıtlı Kişiler</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thr}>
            <th>Tam İsim</th>
            <th>E-posta</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id} style={styles.tr}>
              <td>{person.full_name}</td>
              <td>{person.email}</td>
              <td>
                <button onClick={() => handleEdit(person)} style={styles.editBtn}>Düzenle</button>
                <button onClick={() => handleDelete(person.id)} style={styles.deleteBtn}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  card: { padding: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  thr: { backgroundColor: '#f2f2f2', textAlign: 'left' },
  tr: { borderBottom: '1px solid #ddd' },
  editBtn: { marginRight: '10px', backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }
};

export default PeopleList;