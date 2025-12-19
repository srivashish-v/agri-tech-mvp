import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();
  const [showModal, setShowModal] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    if (selectedLang === 'English') {
      setLanguage(selectedLang);
    } else {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <div className="absolute top-8 right-8 flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-md">
        <Globe className="w-5 h-5 text-green-600" />
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-transparent border-none outline-none text-gray-700 font-medium cursor-pointer"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
          <option value="Urdu">Urdu</option>
        </select>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="flex items-center gap-3 mb-8">
          <Sprout className="w-16 h-16 text-green-600" />
          <h1 className="text-6xl font-bold text-green-700">AgriTech</h1>
        </div>

        <p className="text-2xl text-gray-600 mb-12 max-w-2xl">
          Smart Farming Solutions for Better Yields
        </p>

        <div className="relative w-full max-w-4xl mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Farming"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <button
          onClick={() => navigate('/farmer-details')}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-semibold px-12 py-4 rounded-full shadow-lg transform transition hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-gray-600">This language will be available soon!</p>
          </div>
        </div>
      )}
    </div>
  );
}
