import React, { useState } from 'react';
import "./UKM.css"; 
// Uncomment these imports when images are available
// import hmsi from '../assets/hmsi.png';
// import hmti from '../assets/hmti.png';
// import disca from '../assets/disca.jpeg';

const ukmGroups = [
  {
    id: 1,
    name: 'HMSI (Himpunan Mahasiswa Sistem Informasi)',
    description: 'Himpunan Mahasiswa Sistem Informasi (HMSI) adalah komunitas mahasiswa S1 Sistem Informasi di Universitas Telkom.',
    // photo: hmsi,
    link: 'https://www.instagram.com/hmsi_telkomuniversity',
    category: 'Teknik',
  },
  {
    id: 2,
    name: 'HMTI (Himpunan Mahasiswa Teknik Industri)',
    description: 'Himpunan Mahasiswa Teknik Industri (HMTI) adalah komunitas mahasiswa S1 Teknik Industri di Universitas Telkom.',
    // photo: hmti,
    link: 'https://www.instagram.com/hmit_telu',
    category: 'Teknik',
  },
  {
    id: 3,
    name: 'DISCA (Digital Supply Chain Student Association)',
    description: 'DISCA adalah komunitas mahasiswa S1 Digital Supply Chain di Universitas Telkom.',
    // photo: disca,
    link: 'https://www.instagram.com/disca.telkomuniv',
    category: 'Bisnis',
  },
  // Tambahkan grup UKM lainnya di sini
];

const UKM = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredUkmGroups = ukmGroups.filter((group) => {
    const matchesCategory =
      selectedCategory === 'all' || group.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="ukm-page">
      <h2>Unit Kegiatan Mahasiswa (UKM)</h2>
      <p>Bergabunglah dengan kelompok UKM ini untuk terhubung dengan mahasiswa yang memiliki minat sama! (Masih dalam pengembangan)</p>

      <div className="category-filter-row">
        <span
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => handleCategoryClick('all')}
        >
          Semua
        </span>
        <span
          className={selectedCategory === 'Teknik' ? 'active' : ''}
          onClick={() => handleCategoryClick('Teknik')}
        >
          Teknik
        </span>
        <span
          className={selectedCategory === 'Bisnis' ? 'active' : ''}
          onClick={() => handleCategoryClick('Bisnis')}
        >
          Bisnis
        </span>
        {/* Tambahkan kategori lainnya jika diperlukan */}
      </div>

      <ul>
        {filteredUkmGroups.length > 0 ? (
          filteredUkmGroups.map((group) => (
            <li key={group.id}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              {group.photo && <img src={group.photo} alt={group.name} />}
              <a href={group.link} target="_blank" rel="noopener noreferrer">
                <button aria-label={`Join ${group.name}`}>
                  Detail <i className="fa fa-whatsapp" aria-hidden="true" />
                </button>
              </a>
            </li>
          ))
        ) : (
          <p>Kelompok UKM tidak ditemukan.</p>
        )}
      </ul>
      <h4>Dalam pengembangan...</h4>
    </div>
  );
};

export default UKM;
