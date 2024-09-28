import React, { useState } from 'react';
import "./HIMA.css"; 
import hmsi from '../assets/hmsi.png';
import hmti from '../assets/hmti.png';
import disca from '../assets/disca.jpeg';
import himaif from '../assets/himaif.jpeg';
import hmit from '../assets/hmit.jpeg';
import imagi from '../assets/imagi.jpeg';

const himaGroups = [
  {
    id: 1,
    name: 'HMSI (Himpunan Mahasiswa Sistem Informasi)',
    description: 'Himpunan Mahasiswa Sistem Informasi (HMSI) is a community of students in S1 Information System Telkom University.',
    photo: hmsi,
    link: 'https://www.instagram.com/hmsi_telkomuniversity',
    category: 'FRI',
  },
  {
    id: 2,
    name: 'HMTI (Himpunan Mahasiswa Teknik Industri)',
    description: `Himpunan Mahasiswa Teknik Industr (HMSI) is a community of students in S1 Industrial Engineering Telkom University.`,
    photo: hmti,
    link: 'https://www.instagram.com/hmit_telu',
    category: 'FRI',
  },
  {
    id: 3,
    name: 'DISCA (Digital Supply Chain Student Association).',
    description: `Digital Supply Chain Student Association is a community of students in S1 Digital Supply Chain Telkom University.`,
    photo: disca,
    link: 'https://www.instagram.com/disca.telkomuniv',
    category: 'FRI',
  },
  {
    id: 4,
    name: 'HIMAIF (Himpunan Mahasiswa Teknik Informatika)',
    description: 'Himpunan Mahasiswa Informatika (HIMAIF) is a community of students in S1 Informatics Telkom University.',
    photo: himaif,
    link: 'https://www.instagram.com/himaiftelkomuniv',
    category: 'FIF',
  },
  {
    id: 5,
    name: 'HMIT (Himpunan Mahasiswa Teknologi Informasi)',
    description: 'HMIT is a community of students in S1 Information Technology Telkom University.',
    photo: hmit,
    link: 'https://www.instagram.com/hmit_telu',
    category: 'FIF',
  },
  {
    id: 6,
    name: 'IMAGI (Himpunan Mahasiswa Desain Komunikasi Visual)',
    description: 'IMAGI is a community of students in S1 Visual Communication Design Telkom University.',
    photo: imagi,
    link: 'https://www.instagram.com/imagi_fik',
    category: 'FIK',
  },
];

const HIMA = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredHimaGroups = himaGroups.filter((group) => {
    const matchesCategory =
      selectedCategory === 'all' || group.category === selectedCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="hima-page">
      <h2>HIMA</h2>
      <p>Join these HIMA groups to connect with like-minded students! (Still in development)</p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search HIMA groups..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="hima-search-input"
      />

      <div className="category-filter-row">
        <span
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => handleCategoryClick('all')}
        >
          All
        </span>
        <span
          className={selectedCategory === 'FRI' ? 'active' : ''}
          onClick={() => handleCategoryClick('FRI')}
        >
          FRI
        </span>
        <span
          className={selectedCategory === 'FIF' ? 'active' : ''}
          onClick={() => handleCategoryClick('FIF')}
        >
          FIF
        </span>
        <span
          className={selectedCategory === 'FIK' ? 'active' : ''}
          onClick={() => handleCategoryClick('FIK')}
        >
          FIK
        </span>
        <span
          className={selectedCategory === 'ETC' ? 'active' : ''}
          onClick={() => handleCategoryClick('ETC')}
        >
          ETC
        </span>
      </div>

      <ul>
        {filteredHimaGroups.length > 0 ? (
          filteredHimaGroups.map((group) => (
            <li key={group.id}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              {group.photo && <img src={group.photo} alt={group.name} />}
              <a href={group.link} target="_blank" rel="noopener noreferrer">
                <button aria-label={`Join ${group.name}`}>
                  Details <i className="fa fa-whatsapp" aria-hidden="true" />
                </button>
              </a>
            </li>
          ))
        ) : (
          <p>No HIMA groups found.</p>
        )}
      </ul>
      <h4>On development...</h4>
    </div>
  );
};

export default HIMA;
