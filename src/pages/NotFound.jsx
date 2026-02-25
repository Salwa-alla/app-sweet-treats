import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
        <h2>Page Non Trouvée</h2>
        <p>La page que vous recherchez n'existe pas.</p>
        <Link 
          to="/" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            marginTop: '20px'
          }}
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
