import React, { useRef } from 'react';
import { useTrainingContext } from '../context/TrainingContext';
import './DataExportImport.css';

const DataExportImport: React.FC = () => {
  const { exportToJSON, importFromJSON, trainings } = useTrainingContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonData = exportToJSON();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `szkolenia-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = importFromJSON(content);
      if (success) {
        alert('✅ Dane zostały pomyślnie zaimportowane!');
      } else {
        alert('❌ Błąd importu. Sprawdź format pliku JSON.');
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="data-export-import">
      <div className="export-section">
        <button 
          onClick={handleExport} 
          className="btn btn-export"
          disabled={trainings.length === 0}
          title={trainings.length === 0 ? 'Brak danych do eksportu' : 'Eksportuj wszystkie dane do pliku JSON'}
        >
          📥 Eksportuj do JSON
        </button>
        {trainings.length === 0 && (
          <span className="export-hint">Dodaj szkolenia, aby móc eksportować dane</span>
        )}
      </div>

      <div className="import-section">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
        <button 
          onClick={handleImportClick} 
          className="btn btn-import"
          title="Importuj dane z pliku JSON"
        >
          📤 Importuj z JSON
        </button>
      </div>
    </div>
  );
};

export default DataExportImport;
