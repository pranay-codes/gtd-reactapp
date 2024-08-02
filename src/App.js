import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NextActionItemsPage from './pages/ActionItemsPage';

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<NextActionItemsPage />} />
    </Routes>
  </Router>
);

export default App;
