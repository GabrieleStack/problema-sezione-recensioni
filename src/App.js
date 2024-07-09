import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Comments from './Comments';
import Test from './Test';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/users/:_id/comments" element={<Comments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

