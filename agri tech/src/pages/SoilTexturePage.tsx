import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

const soilTypes = [
  { name: 'Clay', color: 'bg-orange-200', hoverColor: 'hover:bg-orange-300' },
  { name: 'Clay Loam', color: 'bg-amber-200', hoverColor: 'hover:bg-amber-300' },
  { name: 'Loamy', color: 'bg-yellow-200', hoverColor: 'hover:bg-yellow-300' },
  { name: 'Loamy Sand', color: 'bg-lime-200', hoverColor: 'hover:bg-lime-300' },
  { name: 'Sandy', color: 'bg-orange-100', hoverColor: 'hover:bg-orange-200' },
  { name: 'Sandy Loam', color: 'bg-amber-100', hoverColor: 'hover:bg-amber-200' },
  { name: 'Silt Loam', color: 'bg-stone-200', hoverColor: 'hover:bg-stone-300' },
  { name: 'Silt', color: 'bg-gray-200', hoverColor: 'hover:bg-gray-300' },
];

export default function SoilTexturePage() {
  const navigate = useNavigate();
  const { farmerData, updateFarmerData } = useApp();
  const [selectedSoil, setSelectedSoil] = useState(farmerData.soilType);

  const handleNext = async () => {
    if (!selectedSoil) return;

    try {
      if (farmerData.farmerId) {
        await supabase
          .from('farmers')
          .update({ soil_type: selectedSoil })
          .eq('id', farmerData.farmerId);
      }

      updateFarmerData({ soilType: selectedSoil });
      navigate('/analysis');
    } catch (error) {
      console.error('Error updating soil type:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Layers className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Select Soil Texture</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {soilTypes.map((soil) => (
              <button
                key={soil.name}
                onClick={() => setSelectedSoil(soil.name)}
                className={`${soil.color} ${soil.hoverColor} p-6 rounded-xl transition transform hover:scale-105 ${
                  selectedSoil === soil.name
                    ? 'ring-4 ring-green-600 shadow-lg scale-105'
                    : 'shadow-md'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Layers className="w-12 h-12 mb-3 text-gray-700" />
                  <span className="font-semibold text-gray-800 text-center">{soil.name}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedSoil && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-800 font-medium">
                Selected: <span className="font-bold">{selectedSoil}</span>
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => navigate('/farmer-details')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedSoil}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition ${
                selectedSoil
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
