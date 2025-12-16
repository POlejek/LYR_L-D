import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Training, Participant } from '../types/training.types';

interface TrainingContextType {
  trainings: Training[];
  addTraining: (training: Omit<Training, 'id' | 'entryDate'>) => void;
  updateTraining: (id: string, training: Omit<Training, 'id' | 'entryDate'>) => void;
  deleteTraining: (id: string) => void;
  getTrainingById: (id: string) => Training | undefined;
  addParticipant: (trainingId: string, participant: Omit<Participant, 'id' | 'trainingId'>) => void;
  updateParticipant: (trainingId: string, participantId: string, participant: Omit<Participant, 'id' | 'trainingId'>) => void;
  deleteParticipant: (trainingId: string, participantId: string) => void;
  getParticipantsByTraining: (trainingId: string) => Participant[];
  exportToJSON: () => string;
  importFromJSON: (jsonData: string) => boolean;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const useTrainingContext = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTrainingContext must be used within TrainingProvider');
  }
  return context;
};

interface TrainingProviderProps {
  children: ReactNode;
}

export const TrainingProvider: React.FC<TrainingProviderProps> = ({ children }) => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const addTraining = (training: Omit<Training, 'id' | 'entryDate'>) => {
    const newTraining: Training = {
      ...training,
      id: crypto.randomUUID(),
      entryDate: new Date().toISOString().split('T')[0],
      participants: []
    };
    setTrainings(prev => [...prev, newTraining]);
  };

  const updateTraining = (id: string, training: Omit<Training, 'id' | 'entryDate'>) => {
    setTrainings(prev => prev.map(t => 
      t.id === id 
        ? { ...training, id, entryDate: t.entryDate, participants: t.participants }
        : t
    ));
  };

  const deleteTraining = (id: string) => {
    setTrainings(prev => prev.filter(t => t.id !== id));
  };

  const getTrainingById = (id: string) => {
    return trainings.find(t => t.id === id);
  };

  const addParticipant = (trainingId: string, participant: Omit<Participant, 'id' | 'trainingId'>) => {
    setTrainings(prev => prev.map(training => {
      if (training.id === trainingId) {
        const newParticipant: Participant = {
          ...participant,
          id: crypto.randomUUID(),
          trainingId
        };
        return {
          ...training,
          participants: [...(training.participants || []), newParticipant]
        };
      }
      return training;
    }));
  };

  const updateParticipant = (trainingId: string, participantId: string, participant: Omit<Participant, 'id' | 'trainingId'>) => {
    setTrainings(prev => prev.map(training => {
      if (training.id === trainingId) {
        return {
          ...training,
          participants: (training.participants || []).map(p =>
            p.id === participantId
              ? { ...participant, id: participantId, trainingId }
              : p
          )
        };
      }
      return training;
    }));
  };

  const deleteParticipant = (trainingId: string, participantId: string) => {
    setTrainings(prev => prev.map(training => {
      if (training.id === trainingId) {
        return {
          ...training,
          participants: (training.participants || []).filter(p => p.id !== participantId)
        };
      }
      return training;
    }));
  };

  const getParticipantsByTraining = (trainingId: string) => {
    const training = trainings.find(t => t.id === trainingId);
    return training?.participants || [];
  };

  const exportToJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      trainings
    };
    return JSON.stringify(data, null, 2);
  };

  const importFromJSON = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.trainings && Array.isArray(data.trainings)) {
        setTrainings(data.trainings);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Błąd importu JSON:', error);
      return false;
    }
  };

  return (
    <TrainingContext.Provider 
      value={{
        trainings,
        addTraining,
        updateTraining,
        deleteTraining,
        getTrainingById,
        addParticipant,
        updateParticipant,
        deleteParticipant,
        getParticipantsByTraining,
        exportToJSON,
        importFromJSON
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
