import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TrainingProvider } from './context/TrainingContext';
import TrainingForm from './components/TrainingForm';
import TrainingList from './components/TrainingList';
import ParticipantManagement from './components/ParticipantManagement';
import ParticipantStats from './components/ParticipantStats';
import DataExportImport from './components/DataExportImport';
import './App.css';

type TabType = 'trainings' | 'stats';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('trainings');

  return (
    <div className="home-page">
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'trainings' ? 'active' : ''}`}
            onClick={() => setActiveTab('trainings')}
          >
            📚 Zarządzanie szkoleniami
          </button>
          <button
            className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Statystyki uczestników
          </button>
        </div>
      </div>

      <DataExportImport />

      <div className="tab-content">
        {activeTab === 'trainings' ? (
          <>
            <TrainingForm />
            <TrainingList />
          </>
        ) : (
          <ParticipantStats />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <TrainingProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>🎓 System Zarządzania Szkoleniami HR</h1>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/training/:trainingId/participants" element={<ParticipantManagement />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>© 2025 System Zarządzania Szkoleniami HR</p>
          </footer>
        </div>
      </Router>
    </TrainingProvider>
  );
}

export default App;
