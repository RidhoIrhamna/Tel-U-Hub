import React, { useState } from 'react';
import "./StudyGroup.css"; 
// Uncomment these imports when images are available
// import groupA from '../assets/groupA.png';
// import groupB from '../assets/groupB.png';
// import groupC from '../assets/groupC.jpeg';

const studyGroups = [
  {
    id: 1,
    name: 'Data Science Study Group',
    description: 'This group focuses on exploring various data science techniques including machine learning, data analysis, and visualization.',
    // photo: groupA,
    link: 'https://www.instagram.com/datasciencestudygroup',
    category: 'Technology',
  },
  {
    id: 2,
    name: 'Marketing Analytics Study Group',
    description: 'A group dedicated to learning how to apply analytics and data-driven decision making in marketing strategies.',
    // photo: groupB,
    link: 'https://www.instagram.com/marketinganalyticsgroup',
    category: 'Business',
  },
  {
    id: 3,
    name: 'Blockchain Development Study Group',
    description: 'This group delves into the principles of blockchain technology, smart contracts, and decentralized applications (dApps).',
    // photo: groupC,
    link: 'https://www.instagram.com/blockchaindevelopmentgroup',
    category: 'Technology',
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
          className={selectedCategory === 'Technology' ? 'active' : ''}
          onClick={() => handleCategoryClick('Technology')}
        >
          Technology
        </span>
        <span
          className={selectedCategory === 'Business' ? 'active' : ''}
          onClick={() => handleCategoryClick('Business')}
        >
          Business
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
