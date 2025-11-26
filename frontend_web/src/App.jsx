import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/Navbar';
import CompanyList from './pages/CompanyList';
import CompanyAnalysis from './pages/CompanyAnalysis';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-midnight-900 text-white relative overflow-hidden font-sans selection:bg-accent-lime selection:text-midnight-900">
          {/* Background Effects */}
          <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none z-50 mix-blend-overlay"></div>
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <Navbar />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<CompanyList />} />
              <Route path="/analysis/:id" element={<CompanyAnalysis />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;