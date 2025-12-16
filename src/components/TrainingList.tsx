import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingContext } from '../context/TrainingContext';
import TrainingForm from './TrainingForm';
import './TrainingList.css';

const TrainingList: React.FC = () => {
  const { trainings, deleteTraining } = useTrainingContext();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć to szkolenie?')) {
      deleteTraining(id);
    }
  };

  const handleViewParticipants = (id: string) => {
    navigate(`/training/${id}/participants`);
  };

  const trainingToEdit = editingId ? trainings.find(t => t.id === editingId) : undefined;

  if (editingId && trainingToEdit) {
    return (
      <TrainingForm
        trainingToEdit={trainingToEdit}
        onSuccess={() => setEditingId(null)}
        onCancel={() => setEditingId(null)}
      />
    );
  }

  return (
    <div className="training-list-container">
      <div className="list-header">
        <h2>Lista szkoleń</h2>
        <p className="training-count">Liczba szkoleń: {trainings.length}</p>
      </div>

      {trainings.length === 0 ? (
        <div className="empty-state">
          <p>Nie dodano jeszcze żadnych szkoleń.</p>
          <p>Użyj formularza powyżej, aby dodać pierwsze szkolenie.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="training-table">
            <thead>
              <tr>
                <th>Okres</th>
                <th>Departament</th>
                <th>Nazwa</th>
                <th>Typ</th>
                <th>Dostawca</th>
                <th>Typ dostawcy</th>
                <th>Suma kosztów</th>
                <th>Kategoria</th>
                <th>Termin</th>
                <th>Uczestnicy</th>
                <th>Data wpisu</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map((training) => (
                <tr key={training.id}>
                  <td>{training.period}</td>
                  <td>{training.department}</td>
                  <td>{training.name}</td>
                  <td>{training.type}</td>
                  <td>{training.provider}</td>
                  <td>{training.providerType}</td>
                  <td className="cost">{training.totalCost.toFixed(2)} PLN</td>
                  <td>{training.category}</td>
                  <td className="date-range">
                    {training.dateRange.startDate}<br />
                    do<br />
                    {training.dateRange.endDate}
                  </td>
                  <td className="participants-count">
                    {training.participants?.length || 0}
                  </td>
                  <td>{training.entryDate}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(training.id)}
                      className="btn btn-sm btn-edit"
                      title="Edytuj"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleViewParticipants(training.id)}
                      className="btn btn-sm btn-participants"
                      title="Uczestnicy"
                    >
                      👥
                    </button>
                    <button
                      onClick={() => handleDelete(training.id)}
                      className="btn btn-sm btn-delete"
                      title="Usuń"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrainingList;
