import React, { useState } from 'react';
import "./Community.css"; // Import CSS file for styling
import bandungDevImg from '../assets/bandungdev.png';
import aisecImg from '../assets/aisec.png';
import webinarImg from '../assets/foto webinar.jpg';
import hipmiImg from '../assets/hipmi.png';
import gdscImg from '../assets/GDSC Bandung.jpg';
import bccfImg from '../assets/BCCF.jpeg';

const communities = [
  {
    id: 1,
    name: 'Bandung Devs',
    description: `The curated software developer and engineering community in Bandung, Indonesia.`,
    photo: bandungDevImg,
    link: 'https://bandungdev.com',
    category: 'technologies',
  },
  {
    id: 2,
    name: 'AISEC in Bandung',
    description: `AIESEC is a global youth-led organization striving to achieve peace and fulfillment of humankind’s potential.`,
    photo: aisecImg,
    link: 'https://aiesec.or.id',
    category: 'soft skill',
  },
  {
    id: 3,
    name: 'Info Seminar',
    description: 'Get updates on upcoming seminars and workshops from regional, national, and international.',
    photo: webinarImg,
    link: 'https://t.me/webinar_nasional',
    category: 'soft skill',
  },
  {
    id: 4,
    name: 'HIPMI Bandung',
    description: 'The Bandung chapter of the Indonesian Young Entrepreneurs Association (HIPMI) empowering to embrace business.',
    photo: hipmiImg,
    link: 'https://hipmibdg.or.id/',
    category: 'entrepreneur',
  },
  {
    id: 5,
    name: 'GDSC Telkom University',
    description: 'Google Developer Student Clubs at Telkom University, empowering students to develop skills and grow through tech.',
    photo: gdscImg,
    link: 'https://www.instagram.com/gdsc.telkomunivbdg/?hl=id',
    category: 'technologies',
  },
  {
    id: 6,
    name: 'Bandung CreatiCity Forum',
    description: 'A forum that gathers creative individuals and organizations to foster innovation and creativity in Bandung.',
    photo: bccfImg,
    link: 'https://bccf.id/',
    category: 'entrepreneur',
  },
];

const Community = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="community-page">
      <h2>Community</h2>
      <p>Join these communities to connect with like-minded people! (Bandung only, still in development)</p>

      <div className="category-filter-row">
        <span
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => handleCategoryClick('all')}
        >
          All
        </span>
        <span
          className={selectedCategory === 'technologies' ? 'active' : ''}
          onClick={() => handleCategoryClick('technologies')}
        >
          Technologies
        </span>
        <span
          className={selectedCategory === 'soft skill' ? 'active' : ''}
          onClick={() => handleCategoryClick('soft skill')}
        >
          Soft Skill
        </span>
        <span
          className={selectedCategory === 'entrepreneur' ? 'active' : ''}
          onClick={() => handleCategoryClick('entrepreneur')}
        >
          Entrepreneur
        </span>
      </div>

      <ul>
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => (
            <li key={community.id}>
              <h3>{community.name}</h3>
              <p>{community.description}</p>
              <img src={community.photo} alt={community.name} />
              <a href={community.link} target="_blank" rel="noopener noreferrer">
                <button>
                  Join <i className="fa fa-whatsapp" aria-hidden="true" />
                </button>
              </a>
            </li>
          ))
        ) : (
          <p>No communities found matching your search.</p>
        )}
      </ul>
      <h4>On development...</h4>
    </div>
  );
};

export default Community;
