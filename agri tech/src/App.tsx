import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import FarmerDetailsPage from './pages/FarmerDetailsPage';
import SoilTexturePage from './pages/SoilTexturePage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/farmer-details" element={<FarmerDetailsPage />} />
          <Route path="/soil-texture" element={<SoilTexturePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
