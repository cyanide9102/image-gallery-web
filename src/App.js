import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/shared/navbar';
import Gallery from './components/gallery';
import UploadImage from './components/uploadImage';
import About from './components/about';
import NotFound from './components/notFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Gallery />} />
            <Route exact path="/upload-image" element={<UploadImage />} />
            <Route exact path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
