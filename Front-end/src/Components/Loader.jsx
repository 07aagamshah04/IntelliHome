// Loader.js
import './Loader.css'; // Create this file for styling

const Loader = () => {
  return (
    <div className="loader">
      <div className="dot" style={{ backgroundColor: '#0DC0E1' }}></div>
      <div className="dot" style={{ backgroundColor: '#F7A22E' }}></div>
      <div className="dot" style={{ backgroundColor: '#FE302F' }}></div>
      <div className="dot" style={{ backgroundColor: '#00C060' }}></div>
    </div>
  );
};

export default Loader;
