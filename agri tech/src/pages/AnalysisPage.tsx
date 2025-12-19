import { useState } from 'react';
import { ArrowLeft, Download, MessageCircle, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const cropRecommendations = [
  {
    name: 'Rice',
    yield: '4-5 tons/acre',
    price: '₹2000-2500/quintal',
    image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Wheat',
    yield: '3-4 tons/acre',
    price: '₹1800-2200/quintal',
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Cotton',
    yield: '8-10 quintals/acre',
    price: '₹6000-7000/quintal',
    image: 'https://images.pexels.com/photos/5255234/pexels-photo-5255234.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Sugarcane',
    yield: '30-40 tons/acre',
    price: '₹300-350/quintal',
    image: 'https://images.pexels.com/photos/8844590/pexels-photo-8844590.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Maize',
    yield: '2-3 tons/acre',
    price: '₹1500-1800/quintal',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const chatbotResponses = {
  'best crop': 'Based on your soil type, I recommend Rice, Wheat, or Cotton. These crops are well-suited for your conditions.',
  'fertilizer': 'For optimal growth, use NPK fertilizers with a ratio of 10:26:26 during planting and urea during growth stages.',
  'irrigation': 'Your crops need regular irrigation. Install drip irrigation for water efficiency. Water 2-3 times per week.',
  'pest': 'Common pests include aphids and stem borers. Use neem-based pesticides or contact your local agricultural office.',
  'weather': 'Check weather forecasts regularly. Avoid planting before heavy rains. Best planting season is after monsoons.',
  'default': 'I can help with crop recommendations, fertilizers, irrigation, pest control, and weather advice. What would you like to know?',
};

export default function AnalysisPage() {
  const navigate = useNavigate();
  const { farmerData } = useApp();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: 'Hello! How can I help you with your farming today?', sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages([...messages, { text: inputMessage, sender: 'user' }]);

    const lowerInput = inputMessage.toLowerCase();
    let response = chatbotResponses.default;

    for (const [key, value] of Object.entries(chatbotResponses)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
    }, 500);

    setInputMessage('');
  };

  const handleDownloadReport = () => {
    const reportContent = `
AGRITECH FARMING REPORT
========================

Farmer Details:
- Name: ${farmerData.name}
- Mobile: ${farmerData.mobileNo}
- Location: ${farmerData.location}
- Soil Type: ${farmerData.soilType}

Recommended Crops:
${cropRecommendations.map((crop) => `- ${crop.name}: ${crop.yield}, Price: ${crop.price}`).join('\n')}

Season Analysis:
- Best Season: Kharif (June-October)
- Temperature Range: 20-35°C
- Rainfall Required: 600-1200mm

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `farming-report-${farmerData.name.replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const seasonData = {
    labels: ['Kharif', 'Rabi', 'Zaid'],
    datasets: [
      {
        label: 'Best Seasons for Crops',
        data: [85, 70, 45],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
      },
    ],
  };

  const temperatureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Temperature Suitability (°C)',
        data: [18, 22, 26, 30, 35, 32, 28, 28, 27, 24, 20, 18],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const rainfallData = {
    labels: ['Required', 'Available'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#3b82f6', '#94a3b8'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Analysis & Recommendations</h1>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Season Analysis</h2>
            <div id="flowchart-container" className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-gray-600 text-center">Flowchart visualization area</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Best Seasons</h3>
                <Bar data={seasonData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Temperature Suitability</h3>
                <Line data={temperatureData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Rainfall Requirements</h3>
                <Doughnut data={rainfallData} options={{ responsive: true }} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Crop Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cropRecommendations.map((crop) => (
                <div key={crop.name} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                  <img src={crop.image} alt={crop.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{crop.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">Yield: {crop.yield}</p>
                    <p className="text-sm text-gray-600">Price: {crop.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate('/farmer-details')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </div>

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {showChat && (
        <div className="fixed bottom-8 right-8 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">Farming Assistant</h3>
            <button onClick={() => setShowChat(false)} className="hover:bg-green-700 p-1 rounded">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t-2 border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about farming..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
