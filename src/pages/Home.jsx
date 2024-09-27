import React, { useState } from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import './Home.css';
import BEM from '../category/BEM';
import UKM from '../category/UKM';
import StudyGroup from '../category/StudyGroup';
import HIMA from '../category/HIMA';

const HomeLayout = () => {
  // This component is now only for routing to nested routes, no longer displays any content
  return (
    <div className="home-layout">
      <Outlet />  {/* Nested Route Outlet for other routes */}
    </div>
  );
};

const MainHome = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const news = [
    { 
      description: 'Keren! Telkom University Choir Ukir Prestasi di Negeri Matador.', 
      link: 'https://www.detik.com/jabar/jabar-gaskeun/d-7469747/keren-telkom-university-choir-ukir-prestasi-di-negeri-matador',
      image: '../src/assets/image 14.jpeg' 
    },
    { 
      description: 'ATEX IV 2024: Sukses Mencapai Atap Eropa', 
      link: 'https://astacala.org/2024/09/atex-iv-2024-sukses-mencapai-atap-eropa/',
      image: '../src/assets/image 15.jpg' 
    },
    { 
      description: 'HMSI Melakukan Bina Desa di desa pasirlangu lalu tanggal 7,8,14 September 2024.', 
      link: 'https://www.instagram.com/p/C_kkRZ2JLqh/?img_index=1',
      image: '../src/assets/image 16.png' 
    }
  ];

  const handleNextNews = () => {
    setCurrentNewsIndex((currentNewsIndex + 1) % news.length);
  };

  const handlePrevNews = () => {
    setCurrentNewsIndex((currentNewsIndex - 1 + news.length) % news.length);
  };

  const categories = [
    { name: 'BEM', link: 'bem', image: '../src/assets/image 1.png' },
    { name: 'HIMA', link: 'hima', image: '../src/assets/image 2.png' },
    { name: 'UKM', link: 'ukm', image: '../src/assets/image 3.png' },
    { name: 'Study Group', link: 'study-group', image: '../src/assets/image 4.png' }
  ];

  return (
    <div className="home-page">
      <div className="home-greetings-container">
        <h1 className="home-greetings-text">Enjoy your journey now!!</h1>
        <img 
          src="../src/assets/2 SCENE 1.png"  
          alt="Greetings Decoration" 
          className="home-greetings-image" 
        />
      </div>

      <div className="home-categories">
        <h2>Organizational Categories</h2>
        <div className="home-category-list">
          {categories.map((category) => (
            <Link key={category.name} to={category.link} className="home-category-card">
              <img src={category.image} alt={category.name} className="home-category-image" />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      <div className="home-news-section">
        <h2>Latest News</h2>
        <div className="home-news-container">
          <img src={news[currentNewsIndex].image} alt="News" className="home-news-image" />
          <div className="home-news-content">
            <p>{news[currentNewsIndex].description}</p>
            <a href={news[currentNewsIndex].link} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        </div>
        <div className="home-news-navigation">
          <button onClick={handlePrevNews} aria-label="Previous News">← Previous</button>
          <button onClick={handleNextNews} aria-label="Next News">Next →</button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <Routes>
      {/* Main Home Route */}
      <Route path="/" element={<MainHome />} />
      <Route path="/" element={<HomeLayout />}>
        {/* Nested Routes that will display separate content */}
        <Route path="bem" element={<BEM />} />
        <Route path="hima" element={<HIMA />} />
        <Route path="ukm" element={<UKM />} />
        <Route path="study-group" element={<StudyGroup />} />
      </Route>
    </Routes>
  );
};

export default Home;
