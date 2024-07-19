import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main'; // Import the Main component where you defined routing

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router> {/* Add Router here to provide routing context */}
      <Main />
    </Router>
  </React.StrictMode>
);
