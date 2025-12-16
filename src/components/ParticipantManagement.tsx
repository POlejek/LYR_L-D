import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrainingContext } from '../context/TrainingContext';
import type { Participant } from '../types/training.types';
import './ParticipantManagement.css';

const ParticipantManagement: React.FC = () => {
  const { trainingId } = useParams<{ trainingId: string }>();
  const navigate = useNavigate();
  const { getTrainingById, getParticipantsByTraining, addParticipant, updateParticipant, deleteParticipant } = useTrainingContext();

  const training = trainingId ? getTrainingById(trainingId) : undefined;
  const participants = trainingId ? getParticipantsByTraining(trainingId) : [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    hoursAttended: 0,
    attendanceChecked: false,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (training) {
      // Oblicz domyślną liczbę godzin na podstawie długości szkolenia
      const startDate = new Date(training.dateRange.startDate);
      const endDate = new Date(training.dateRange.endDate);
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const defaultHours = daysDiff * 8; // Zakładamy 8 godzin dziennie
      
      setFormData(prev => ({
        ...prev,
        hoursAttended: prev.hoursAttended === 0 ? defaultHours : prev.hoursAttended
      }));
    }
  }, [training]);

  if (!training || !trainingId) {
    return (
      <div className="participant-management">
        <h2>Szkolenie nie znalezione</h2>
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Powrót do listy szkoleń
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateParticipant(trainingId, editingId, formData);
      setEditingId(null);
    } else {
      addParticipant(trainingId, formData);
    }

    // Reset formularza
    const startDate = new Date(training.dateRange.startDate);
    const endDate = new Date(training.dateRange.endDate);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const defaultHours = daysDiff * 8;

    setFormData({
      firstName: '',
      lastName: '',
      department: '',
      hoursAttended: defaultHours,
      attendanceChecked: false,
    });
  };

  const handleEdit = (participant: Participant) => {
    setFormData({
      firstName: participant.firstName,
      lastName: participant.lastName,
      department: participant.department,
      hoursAttended: participant.hoursAttended,
      attendanceChecked: participant.attendanceChecked,
    });
    setEditingId(participant.id);
  };

  const handleDelete = (participantId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tego uczestnika?')) {
      deleteParticipant(trainingId, participantId);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    const startDate = new Date(training.dateRange.startDate);
    const endDate = new Date(training.dateRange.endDate);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const defaultHours = daysDiff * 8;

    setFormData({
      firstName: '',
      lastName: '',
      department: '',
      hoursAttended: defaultHours,
      attendanceChecked: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="participant-management">
      <div className="page-header">
        <button onClick={() => navigate('/')} className="btn btn-back">
          ← Powrót do listy szkoleń
        </button>
        <div>
          <h2>Uczestnicy szkolenia</h2>
          <div className="training-info">
            <p><strong>Nazwa:</strong> {training.name}</p>
            <p><strong>Departament:</strong> {training.department}</p>
            <p><strong>Termin:</strong> {training.dateRange.startDate} - {training.dateRange.endDate}</p>
          </div>
        </div>
      </div>

      <div className="participant-form-container">
        <h3>{editingId ? 'Edytuj uczestnika' : 'Dodaj uczestnika'}</h3>
        <form onSubmit={handleSubmit} className="participant-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">Imię:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nazwisko:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Departament:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hoursAttended">Godziny szkolenia:</label>
              <input
                type="number"
                id="hoursAttended"
                name="hoursAttended"
                value={formData.hoursAttended}
                onChange={handleChange}
                min="0"
                step="0.5"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="attendanceChecked"
                  checked={formData.attendanceChecked}
                  onChange={handleChange}
                />
                <span>Obecność potwierdzona</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Zapisz zmiany' : 'Dodaj uczestnika'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Anuluj
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="participants-list">
        <h3>Lista uczestników ({participants.length})</h3>
        {participants.length === 0 ? (
          <p className="empty-state">Nie dodano jeszcze uczestników do tego szkolenia.</p>
        ) : (
          <div className="table-responsive">
            <table className="participants-table">
              <thead>
                <tr>
                  <th>Imię</th>
                  <th>Nazwisko</th>
                  <th>Departament</th>
                  <th>Godziny</th>
                  <th>Obecność</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.id}>
                    <td>{participant.firstName}</td>
                    <td>{participant.lastName}</td>
                    <td>{participant.department}</td>
                    <td>{participant.hoursAttended}h</td>
                    <td>
                      <span className={`attendance-badge ${participant.attendanceChecked ? 'confirmed' : 'pending'}`}>
                        {participant.attendanceChecked ? '✓ Potwierdzona' : '⏳ Oczekuje'}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        onClick={() => handleEdit(participant)}
                        className="btn btn-sm btn-edit"
                        title="Edytuj"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(participant.id)}
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
    </div>
  );
};

export default ParticipantManagement;
