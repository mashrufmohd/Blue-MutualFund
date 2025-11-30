import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/Navbar';
import CompanyList from './pages/CompanyList';
import CompanyAnalysis from './pages/CompanyAnalysis';
import CompanyDirectory from './pages/CompanyDirectory';
import AnalysisOverview from './pages/AnalysisOverview';

const AppShell = () => {
  const location = useLocation();
  const lightRoutes = ['/', '/companies', '/analysis-info'];
  const isHomeLike = lightRoutes.includes(location.pathname);
  const isAnalysisPage = location.pathname.startsWith('/analysis');
  const navShouldBeLight = isHomeLike || isAnalysisPage;

  return (
    <div
      className={`min-h-screen relative overflow-hidden font-sans selection:bg-accent-lime selection:text-midnight-900 ${
        isHomeLike ? 'bg-white text-slate-900' : 'bg-midnight-900 text-white'
      }`}
    >
      {!isHomeLike && (
        <>
          <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none z-50 mix-blend-overlay"></div>
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
        </>
      )}

  <Navbar variant={navShouldBeLight ? 'light' : 'dark'} />
      <div className={isHomeLike ? '' : 'relative z-10'}>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/companies" element={<CompanyDirectory />} />
          <Route path="/analysis-info" element={<AnalysisOverview />} />
          <Route path="/analysis/:id" element={<CompanyAnalysis />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppShell />
      </Router>
    </Provider>
  );
};

export default App;