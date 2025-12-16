import React, { useState, useEffect } from 'react';
import { useTrainingContext } from '../context/TrainingContext';
import type { Training, TrainingPeriod, TrainingType, ProviderType } from '../types/training.types';
import './TrainingForm.css';

interface TrainingFormProps {
  trainingToEdit?: Training;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TrainingForm: React.FC<TrainingFormProps> = ({ trainingToEdit, onSuccess, onCancel }) => {
  const { addTraining, updateTraining } = useTrainingContext();
  
  const [formData, setFormData] = useState({
    period: 'miesiąc' as TrainingPeriod,
    department: '',
    name: '',
    type: 'On-site' as TrainingType,
    provider: '',
    providerType: 'wewnętrzne' as ProviderType,
    trainingCost: 0,
    otherCosts: 0,
    category: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (trainingToEdit) {
      setFormData({
        period: trainingToEdit.period,
        department: trainingToEdit.department,
        name: trainingToEdit.name,
        type: trainingToEdit.type,
        provider: trainingToEdit.provider,
        providerType: trainingToEdit.providerType,
        trainingCost: trainingToEdit.trainingCost,
        otherCosts: trainingToEdit.otherCosts,
        category: trainingToEdit.category,
        startDate: trainingToEdit.dateRange.startDate,
        endDate: trainingToEdit.dateRange.endDate,
      });
    }
  }, [trainingToEdit]);

  const totalCost = formData.trainingCost + formData.otherCosts;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trainingData = {
      period: formData.period,
      department: formData.department,
      name: formData.name,
      type: formData.type,
      provider: formData.provider,
      providerType: formData.providerType,
      trainingCost: formData.trainingCost,
      otherCosts: formData.otherCosts,
      totalCost,
      category: formData.category,
      dateRange: {
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
      participants: trainingToEdit?.participants || []
    };

    if (trainingToEdit) {
      updateTraining(trainingToEdit.id, trainingData);
    } else {
      addTraining(trainingData);
    }

    // Reset formularza
    setFormData({
      period: 'miesiąc',
      department: '',
      name: '',
      type: 'On-site',
      provider: '',
      providerType: 'wewnętrzne',
      trainingCost: 0,
      otherCosts: 0,
      category: '',
      startDate: '',
      endDate: '',
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="training-form-container">
      <h2>{trainingToEdit ? 'Edytuj szkolenie' : 'Dodaj nowe szkolenie'}</h2>
      <form onSubmit={handleSubmit} className="training-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="period">Okres szkolenia:</label>
            <select
              id="period"
              name="period"
              value={formData.period}
              onChange={handleChange}
              required
            >
              <option value="miesiąc">Miesiąc</option>
              <option value="kwartał">Kwartał</option>
              <option value="rok">Rok</option>
            </select>
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
            <label htmlFor="name">Nazwa szkolenia:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Typ:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="On-site">On-site</option>
              <option value="On-line">On-line</option>
              <option value="Off-site">Off-site</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="provider">Dostawca:</label>
            <input
              type="text"
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="providerType">Typ dostawcy:</label>
            <select
              id="providerType"
              name="providerType"
              value={formData.providerType}
              onChange={handleChange}
              required
            >
              <option value="wewnętrzne">Wewnętrzne</option>
              <option value="zewnętrzne">Zewnętrzne</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trainingCost">Koszt szkolenia (PLN):</label>
            <input
              type="number"
              id="trainingCost"
              name="trainingCost"
              value={formData.trainingCost}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="otherCosts">Inne koszty (PLN):</label>
            <input
              type="number"
              id="otherCosts"
              name="otherCosts"
              value={formData.otherCosts}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group total-cost">
            <label>Suma kosztów (PLN):</label>
            <div className="total-cost-value">{totalCost.toFixed(2)}</div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategoria:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Data rozpoczęcia:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Data zakończenia:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {trainingToEdit ? 'Zapisz zmiany' : 'Dodaj szkolenie'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Anuluj
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TrainingForm;
