import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export default function FarmerDetailsPage() {
  const navigate = useNavigate();
  const { farmerData, updateFarmerData } = useApp();
  const [formData, setFormData] = useState({
    name: farmerData.name,
    mobileNo: farmerData.mobileNo,
    location: farmerData.location,
    aadhar: farmerData.aadhar,
  });
  const [errors, setErrors] = useState({
    name: '',
    mobileNo: '',
    aadhar: '',
  });

  const validateForm = () => {
    const newErrors = { name: '', mobileNo: '', aadhar: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Mobile number must be 10 digits';
      isValid = false;
    }

    if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar must be 12 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    if (formData.name || formData.mobileNo || formData.aadhar) {
      validateForm();
    }
  }, [formData]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const { data, error } = await supabase
        .from('farmers')
        .insert([
          {
            name: formData.name,
            mobile_no: formData.mobileNo,
            location: formData.location,
            aadhar: formData.aadhar,
          },
        ])
        .select()
        .maybeSingle();

      if (error) throw error;

      updateFarmerData({
        ...formData,
        farmerId: data?.id,
      });

      navigate('/soil-texture');
    } catch (error) {
      console.error('Error saving farmer data:', error);
    }
  };

  const isFormValid = formData.name.trim() && /^\d{10}$/.test(formData.mobileNo) &&
    (!formData.aadhar || /^\d{12}$/.test(formData.aadhar));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <User className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Farmer Details</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobileNo}
                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.mobileNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your location"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Aadhar Number
              </label>
              <input
                type="tel"
                value={formData.aadhar}
                onChange={(e) => setFormData({ ...formData, aadhar: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.aadhar ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="12-digit Aadhar number (optional)"
              />
              {errors.aadhar && <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition ${
                isFormValid
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
