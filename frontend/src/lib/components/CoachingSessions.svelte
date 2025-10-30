<script lang="ts">
  export let sessions: any[] = [];
  
  const groupedSessions = sessions.reduce((acc: any, session) => {
    if (!acc[session.dayName]) {
      acc[session.dayName] = {
        dayName: session.dayName,
        sessionCount: session.sessionCount,
        sessions: []
      };
    }
    acc[session.dayName].sessions.push(session);
    return acc;
  }, {});
  
  const days: any[] = Object.values(groupedSessions);
  
  const totalSessions = sessions.length;
  const uniqueAgents = new Set(sessions.map(s => s.employee)).size;
  const avgPerDay = days.length > 0 ? Math.round(totalSessions / days.length) : 0;
  
  const coachCounts = sessions.reduce((acc: any, session) => {
    acc[session.coach] = (acc[session.coach] || 0) + 1;
    return acc;
  }, {});
  const mostActiveCoach = Object.entries(coachCounts).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'N/A';
</script>

<div class="sessions-header">
  <h2>📅 This Week's Coaching Sessions</h2>
</div>

<div class="days-grid">
    {#each days as day}
      <div class="day-card">
        <div class="day-header">
          <h3>{day.dayName}</h3>
          <span class="session-count">{day.sessionCount} sessions</span>
        </div>

        <div class="sessions-list">
          {#each day.sessions as session}
            <div class="session-item">
              <span class="employee">{session.employee}</span>
              <span class="coach">{session.coach}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <div class="week-summary">
      <h3>Week Summary</h3>
      <div class="summary-item">
        <span class="label">Total Sessions</span>
        <span class="value">{totalSessions}</span>
      </div>
      <div class="summary-item">
        <span class="label">Unique Agents</span>
        <span class="value">{uniqueAgents}</span>
      </div>
      <div class="summary-item">
        <span class="label">Avg per Day</span>
        <span class="value">{avgPerDay}</span>
      </div>
      <div class="summary-item">
        <span class="label">Most Active Coach</span>
        <span class="value highlight">{mostActiveCoach}</span>
      </div>
    </div>
  </div>

<style>
  
  .sessions-header h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
  }

  .days-grid {
    column-count: 3;
    column-gap: 1rem;
  }
  
  .day-card {
    background: white;
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    break-inside: avoid;
    margin-bottom: 1rem;
  }

  .day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .day-header h3 {
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151;
    margin: 0;
  }

  .session-count {
    font-size: 0.75rem;
    color: #1d4ed8;
    font-weight: 400;
    background: #dbeafe;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }

  .sessions-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .session-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.5rem;
    background: #f9fafb;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .session-item:hover {
    background: #f3f4f6;
  }

  .employee {
    font-weight: 500;
    color: #374151;
    font-size: 0.75rem;
  }

  .coach {
    color: #6b7280;
    font-size: 0.75rem;
  }
  
  .week-summary {
    background: #eef2ff;
    border-radius: 8px;
    padding: 1.25rem;
    border: 1px solid #bfdbfe;
    break-inside: avoid;
    margin-bottom: 1rem;
  }
  
  .week-summary h3 {
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151;
    margin: 0 0 0.5rem 0;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }

  .summary-item:last-child {
    border-bottom: none;
  }

  .label {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .value {
    font-size: 0.75rem;
    font-weight: 700;
    color: #111827;
  }

  .value.highlight {
    color: #3b82f6;
  }
</style>