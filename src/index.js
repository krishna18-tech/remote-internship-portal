import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';   // Professional custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap (if installed)
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance logging
reportWebVitals();