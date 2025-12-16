import React, { useMemo } from 'react';
import { useTrainingContext } from '../context/TrainingContext';
import './ParticipantStats.css';

interface ParticipantStatistics {
  fullName: string;
  firstName: string;
  lastName: string;
  department: string;
  totalTrainings: number;
  totalHours: number;
  averageHours: number;
  attendanceRate: number;
  confirmedAttendance: number;
  trainingsList: string[];
}

const ParticipantStats: React.FC = () => {
  const { trainings } = useTrainingContext();

  const participantStats = useMemo(() => {
    const statsMap = new Map<string, ParticipantStatistics>();

    trainings.forEach(training => {
      training.participants?.forEach(participant => {
        const key = `${participant.firstName}-${participant.lastName}`;
        
        if (!statsMap.has(key)) {
          statsMap.set(key, {
            fullName: `${participant.firstName} ${participant.lastName}`,
            firstName: participant.firstName,
            lastName: participant.lastName,
            department: participant.department,
            totalTrainings: 0,
            totalHours: 0,
            averageHours: 0,
            attendanceRate: 0,
            confirmedAttendance: 0,
            trainingsList: []
          });
        }

        const stats = statsMap.get(key)!;
        stats.totalTrainings += 1;
        stats.totalHours += participant.hoursAttended;
        stats.trainingsList.push(training.name);
        if (participant.attendanceChecked) {
          stats.confirmedAttendance += 1;
        }
        // Aktualizuj departament (najnowszy)
        stats.department = participant.department;
      });
    });

    // Oblicz średnie i procenty
    statsMap.forEach(stats => {
      stats.averageHours = stats.totalHours / stats.totalTrainings;
      stats.attendanceRate = (stats.confirmedAttendance / stats.totalTrainings) * 100;
    });

    return Array.from(statsMap.values()).sort((a, b) => 
      b.totalTrainings - a.totalTrainings || b.totalHours - a.totalHours
    );
  }, [trainings]);

  const overallStats = useMemo(() => {
    if (participantStats.length === 0) return null;

    return {
      totalParticipants: participantStats.length,
      totalTrainingInstances: participantStats.reduce((sum, p) => sum + p.totalTrainings, 0),
      totalHours: participantStats.reduce((sum, p) => sum + p.totalHours, 0),
      averageTrainingsPerPerson: participantStats.reduce((sum, p) => sum + p.totalTrainings, 0) / participantStats.length,
      averageHoursPerPerson: participantStats.reduce((sum, p) => sum + p.totalHours, 0) / participantStats.length,
      overallAttendanceRate: participantStats.reduce((sum, p) => sum + p.attendanceRate, 0) / participantStats.length
    };
  }, [participantStats]);

  return (
    <div className="participant-stats-container">
      <div className="stats-header">
        <h2>📊 Statystyki Uczestników</h2>
        <p className="stats-subtitle">Zbiorcze dane o wszystkich uczestnikach szkoleń</p>
      </div>

      {participantStats.length === 0 ? (
        <div className="empty-state">
          <p>Brak danych do wyświetlenia.</p>
          <p>Dodaj uczestników do szkoleń, aby zobaczyć statystyki.</p>
        </div>
      ) : (
        <>
          {/* Ogólne statystyki */}
          {overallStats && (
            <div className="overall-stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-value">{overallStats.totalParticipants}</div>
                <div className="stat-label">Unikalnych uczestników</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-value">{overallStats.totalTrainingInstances}</div>
                <div className="stat-label">Uczestnictw w szkoleniach</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-value">{overallStats.totalHours.toFixed(0)}h</div>
                <div className="stat-label">Łącznie godzin</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-value">{overallStats.averageTrainingsPerPerson.toFixed(1)}</div>
                <div className="stat-label">Średnio szkoleń/osobę</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🕐</div>
                <div className="stat-value">{overallStats.averageHoursPerPerson.toFixed(0)}h</div>
                <div className="stat-label">Średnio godzin/osobę</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{overallStats.overallAttendanceRate.toFixed(0)}%</div>
                <div className="stat-label">Wskaźnik obecności</div>
              </div>
            </div>
          )}

          {/* Tabela szczegółowa */}
          <div className="detailed-stats">
            <h3>Szczegółowe statystyki uczestników</h3>
            <div className="table-responsive">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Imię i nazwisko</th>
                    <th>Departament</th>
                    <th>Liczba szkoleń</th>
                    <th>Łączne godziny</th>
                    <th>Średnia godzin</th>
                    <th>Potwierdzona obecność</th>
                    <th>Wskaźnik obecności</th>
                    <th>Lista szkoleń</th>
                  </tr>
                </thead>
                <tbody>
                  {participantStats.map((participant, index) => (
                    <tr key={`${participant.firstName}-${participant.lastName}`}>
                      <td className="row-number">{index + 1}</td>
                      <td className="participant-name">
                        <strong>{participant.fullName}</strong>
                      </td>
                      <td>{participant.department}</td>
                      <td className="number-value">
                        <span className="badge badge-blue">{participant.totalTrainings}</span>
                      </td>
                      <td className="number-value">
                        <strong>{participant.totalHours.toFixed(1)}h</strong>
                      </td>
                      <td className="number-value">
                        {participant.averageHours.toFixed(1)}h
                      </td>
                      <td className="number-value">
                        {participant.confirmedAttendance} / {participant.totalTrainings}
                      </td>
                      <td>
                        <div className="attendance-bar-container">
                          <div 
                            className="attendance-bar"
                            style={{ width: `${participant.attendanceRate}%` }}
                          />
                          <span className="attendance-percentage">
                            {participant.attendanceRate.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="trainings-list">
                        <details>
                          <summary>
                            Pokaż ({participant.trainingsList.length})
                          </summary>
                          <ul>
                            {participant.trainingsList.map((training, idx) => (
                              <li key={idx}>{training}</li>
                            ))}
                          </ul>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dodatkowe podsumowania */}
          <div className="additional-insights">
            <h3>📌 Kluczowe wskaźniki</h3>
            <div className="insights-grid">
              <div className="insight-item">
                <span className="insight-label">Najbardziej aktywny uczestnik:</span>
                <span className="insight-value">
                  {participantStats[0]?.fullName} ({participantStats[0]?.totalTrainings} szkoleń)
                </span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Najwięcej godzin:</span>
                <span className="insight-value">
                  {participantStats.reduce((max, p) => p.totalHours > max.totalHours ? p : max, participantStats[0])?.fullName}
                  ({participantStats.reduce((max, p) => p.totalHours > max.totalHours ? p : max, participantStats[0])?.totalHours.toFixed(0)}h)
                </span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Najwyższa frekwencja:</span>
                <span className="insight-value">
                  {participantStats.filter(p => p.attendanceRate === 100).length} osób (100%)
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipantStats;
