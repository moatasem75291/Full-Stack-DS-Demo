import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './shared/Header';
import HomePage from './pages/HomePage';
import IrisPage from './pages/IrisPage';
import ImageCaptioningPage from './pages/ImageCaptioningPage';
import Footer from './shared/Footer';
import "./style/App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/iris" element={<IrisPage />} />
          <Route path="/image-captioning" element={<ImageCaptioningPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
