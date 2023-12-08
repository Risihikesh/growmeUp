import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import SecondPageComponent1 from './components/SecondPageComponent1';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">First Page</Link>
          </li>
          <li>
            <Link to="/second-page">Second Page</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element ={<FirstPage/>} />
        <Route path="/second-page" element ={<SecondPageComponent1/>} />
       
      </Routes>
    </Router>
  );
};

export default App;

