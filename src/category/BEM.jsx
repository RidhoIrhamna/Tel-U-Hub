import React, { useState } from 'react';
import './BEM.css';
import { FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa'; 

const BEM = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bem-page">
      <header className="bem-header-container">
        <div className="bem-header">
          <img src="../src/assets/bem.png" alt="BEM Logo" className="bem-header-logo" />
          <h1 className="bem-header-text">BEM KEMA Telkom University</h1>
        </div>
        <img src="../src/assets/bemheader.jpg" alt="BEM Header" className="bem-header-image" />
        <p className="bem-header-description">
        BEM is a student executive body that represents the interests of Telkom University students in various academic, 
        social, and community affairs. Join us to advance the campus, 
        channel student aspirations, and maximize human resource potential.
        </p>
        <div className="bem-social-links">
          <a href="https://www.instagram.com/bemtelu" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com/company/bem" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://bem.telkomuniversity.ac.id/" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
        </div>
      </header>

      <section className="bem-achievements-section">
        <h2 className="bem-section-title">Achievements</h2>
        <div className="bem-achievement-list">
          {['National Debate Champion', 'Community Service Award', 'Best Student Organization 2022'].map((title, index) => (
            <div key={index} className="bem-achievement-card">
              <h3>{title}</h3>
              <p>Short description related to {title.toLowerCase()}.</p>
              <a href={`https://example.com/${title.replace(/\s+/g, '-').toLowerCase()}`} target="_blank" rel="noopener noreferrer">Learn More</a>
            </div>
          ))}
        </div>
      </section>

      {/* Hapus bagian pendaftaran */}
      {/* <section className="bem-registration-section">
        {!showForm ? (
          <div className="bem-registration-intro">
            <p>Untuk mendaftar menjadi anggota BEM, klik tombol di bawah untuk melihat prosedur dan formulir pendaftaran.</p>
            <div className="bem-button-container">
              <button className="bem-button" onClick={() => setShowForm(true)}>Daftar</button>
            </div>
          </div>
        ) : (
          <div className="bem-registration-details">
            <h2 className="bem-section-title">Prosedur Pendaftaran</h2>
            <p>Untuk mendaftar menjadi anggota BEM, ikuti prosedur berikut:</p>
            <ol className="bem-procedure-list">
              {[
                'Sudah pernah mengikuti kaderisasi',
                'Menyertakan bukti KTM dan IPK (min 3.0)',
                'Menuliskan motivation letter',
                'Menyertakan fakta integritas',
                'Isi formulir pendaftaran',
                'Tunggu konfirmasi'
              ].map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <div className="bem-registration-form">
              <h2>Form Pendaftaran</h2>
              <form>
                {['Nama Lengkap', 'Email', 'Nomor Telepon'].map((label, index) => (
                  <div className="bem-form-group" key={index}>
                    <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>{label}:</label>
                    <input type={label === 'Email' ? 'email' : 'text'} id={label.toLowerCase().replace(/\s+/g, '-')} required />
                  </div>
                ))}
                {['cadre-proof', 'student-card', 'gpa-proof', 'motivation-letter', 'integrity-statement'].map((file, index) => (
                  <div className="bem-form-group" key={index}>
                    <label htmlFor={file}>Bukti {file.replace(/-/g, ' ').replace('proof', '').trim()} (PDF):</label>
                    <input type="file" id={file} accept=".pdf" required />
                  </div>
                ))}
                <div className="bem-button-container">
                  <button type="submit" className="bem-button">Daftar</button>
                  <button type="button" className="bem-button bem-button-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section> */}
      
    </div>
  );
};

export default BEM;
