// Typy dla okresów szkolenia
export type TrainingPeriod = 'miesiąc' | 'kwartał' | 'rok';

// Typy dla typu szkolenia
export type TrainingType = 'On-site' | 'On-line' | 'Off-site';

// Typy dla typu dostawcy
export type ProviderType = 'wewnętrzne' | 'zewnętrzne';

// Interfejs dla szkolenia
export interface Training {
  id: string;
  period: TrainingPeriod;
  department: string;
  name: string;
  type: TrainingType;
  provider: string;
  providerType: ProviderType;
  trainingCost: number;
  otherCosts: number;
  totalCost: number;
  category: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  entryDate: string;
  participants?: Participant[];
}

// Interfejs dla uczestnika szkolenia
export interface Participant {
  id: string;
  trainingId: string;
  firstName: string;
  lastName: string;
  department: string;
  hoursAttended: number;
  attendanceChecked: boolean;
}
