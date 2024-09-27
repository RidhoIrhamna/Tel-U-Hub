import React from 'react';

const MBTITest = () => {
  return (
    <div style={{ margin:"0",padding: "0",textAlign: 'center' }}>
      <h1 style={{ textAlign: 'left',paddingLeft: "20px", background: "linear-gradient(90deg, #ea9393, #311010)",WebkitBackgroundClip: "text",
        backgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "2.5rem" }}> Test MBTI </h1>
    
      <img src="../src/assets/image.png" alt="MBTI" style={{ margin: '60px 0'}} />
      <a href="https://www.16personalities.com/id/tes-kepribadian" target="_blank" rel="noopener noreferrer">
        <button 
          style={{ 
            font: "Inter",
            backgroundColor: '#c75050', 
            width: '500px',
            color: 'white', 
            padding: '10px 20px', 
            fontSize: '24px', 
            border: 'none', 
            borderRadius: '20px', 
            cursor: 'pointer' ,
            background: "linear-gradient(90deg, #ea9393, #311010)",
          }}
        >
          Mulai Test
        </button>
      </a>
    </div>
  );
};

export default MBTITest;
