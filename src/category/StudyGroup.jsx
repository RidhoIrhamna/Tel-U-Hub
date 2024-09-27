import React, { useState } from 'react';
import "./StudyGroup.css"; 
// Uncomment these imports when images are available
import ESD from '../assets/esd.jpeg';
import SAG from '../assets/sag.jpeg';
import Search from '../assets/search.jpeg';

const studyGroups = [
  {
    id: 1,
    name: 'Enterprise System Development Study Group',
    description: 'This group focus on technology field and how to development best digital product.',
    photo: ESD,
    link: 'https://www.instagram.com/esducation_/',
    category: 'FRI',
  },
  {
    id: 2,
    name: 'System Architecture and Governance Study Group',
    description: 'This group focus on technology field and how to achieve best digital product.',
    photo: SAG,
    link: 'https://www.instagram.com/sagstudygroup/',
    category: 'FRI',
  },
  {
    id: 3,
    name: 'Search Telkom University Study Group',
    description: 'This group focus on Student’s Activities for Research and Competition Handling.',
    photo: Search,
    link: 'https://www.instagram.com/searchtelkomunv/',
    category: 'Umum',
  },
  // Add more study groups as needed
];

const StudyGroup = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredStudyGroups = studyGroups.filter((group) => {
    const matchesCategory =
      selectedCategory === 'all' || group.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="study-group-page">
      <h2>Study Groups</h2>
      <p>Join one of these study groups to enhance your learning and collaborate with peers! (Still under development)</p>

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
          className={selectedCategory === 'Umum' ? 'active' : ''}
          onClick={() => handleCategoryClick('Umum')}
        >
          Umum
        </span>
        <span
          className={selectedCategory === 'ETC' ? 'active' : ''}
          onClick={() => handleCategoryClick('ETC')}
        >
          Etc
        </span>
        {/* Add more categories if needed */}
      </div>

      <ul>
        {filteredStudyGroups.length > 0 ? (
          filteredStudyGroups.map((group) => (
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
          <p>No study groups found.</p>
        )}
      </ul>
      <h4>Under development...</h4>
    </div>
  );
};

export default StudyGroup;
