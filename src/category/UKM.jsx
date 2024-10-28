import React, { useState } from 'react';
import "./UKM.css"; 
import NBB from '../assets/NBB.JPEG';
import UKMBand from '../assets/UKMBand.png';
import Aksara from '../assets/aksara.png';

const ukmGroups = [
  {
    id: 1,
    name: 'NBB (Nippon Bunkan Bu)',
    description: 'Nippon Bunkan Bu (NBB) adalah UKM mahasiswa yang bergerak di bidang kebudayaan Jepang.',
    photo: NBB,
    link: 'https://www.instagram.com/nbb.unitel',
    category: 'Kesenian',
  },
  {
    id: 2,
    name: 'Aksara Jurnalistik',
    description: 'Aksara Jurnalistik adalah UKM mahasiswa yang bergerak di bidang jurnalistik dan publikasi.',
    photo: Aksara,
    link: 'https://www.instagram.com/aksara_tu',
    category: 'Umum',
  },
  {
    id: 3,
    name: 'UKM Band',
    description: 'Nippon Bunkan Bu (NBB) adalah UKM mahasiswa yang bergerak di bidang scene musik.',
    photo: UKMBand,
    link: 'https://www.instagram.com/ukmbandunitel',
    category: 'Kesenian',
  },
];

const UKM = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredUkmGroups = ukmGroups.filter((group) => {
    const matchesCategory =
      selectedCategory === 'all' || group.category === selectedCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ukm-page">
      <h2>Unit Kegiatan Mahasiswa (UKM)</h2>
      <p>Bergabunglah dengan kelompok UKM ini untuk terhubung dengan mahasiswa yang memiliki minat sama! (Masih dalam pengembangan)</p>

      <input
        type="text"
        placeholder="Cari UKM..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="ukm-search-input"
      />

      <div className="category-filter-row">
        <span
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => handleCategoryClick('all')}
        >
          Semua
        </span>
        <span
          className={selectedCategory === 'Kesenian' ? 'active' : ''}
          onClick={() => handleCategoryClick('Kesenian')}
        >
          Kesenian
        </span>
        <span
          className={selectedCategory === 'Umum' ? 'active' : ''}
          onClick={() => handleCategoryClick('Umum')}
        >
          Umum
        </span>
        <span
          className={selectedCategory === 'Lainnya' ? 'active' : ''}
          onClick={() => handleCategoryClick('Lainnya')}
        >
          Etc
        </span>
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
          <p>UKM tidak ditemukan.</p>
        )}
      </ul>
      <h4>on development...</h4>
    </div>
  );
};

export default UKM;
