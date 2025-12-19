import { createContext, useContext, useState, ReactNode } from 'react';

interface FarmerData {
  name: string;
  mobileNo: string;
  location: string;
  aadhar: string;
  soilType: string;
  language: string;
  farmerId?: string;
}

interface AppContextType {
  farmerData: FarmerData;
  updateFarmerData: (data: Partial<FarmerData>) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('English');
  const [farmerData, setFarmerData] = useState<FarmerData>({
    name: '',
    mobileNo: '',
    location: '',
    aadhar: '',
    soilType: '',
    language: 'English',
  });

  const updateFarmerData = (data: Partial<FarmerData>) => {
    setFarmerData((prev) => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider value={{ farmerData, updateFarmerData, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
