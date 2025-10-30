<script lang="ts">
  import CoachingSessions from './CoachingSessions.svelte';

  export let employees: any[] = [];
  export let sessions: any[] = [];

  const teams = ['Sales', 'Support', 'Retention'];

  let overlayFilter = 'None';
  let metricFilter = 'Recency';

  function setOverlayFilter(filter: string) {
    overlayFilter = filter;
  }

  function setMetricFilter(filter: string) {
    metricFilter = filter;
  }

  function getEmployeesByTeam(team: string) {
    return employees
      .filter(emp => emp.team === team)
      .sort((a, b) => a.employeeId.localeCompare(b.employeeId))
      .slice(0, 20);
  }

  function getScoreColor(score: number) {
    if (score >= 90) return { from: '#60a5fa', to: '#3b82f6' }; // Excellent
    if (score >= 80) return { from: '#4ade80', to: '#22c55e' }; // Good
    if (score >= 70) return { from: '#facc15', to: '#eab308' }; // Fair
    return { from: '#f87171', to: '#ef4444' }; // Low
  }

  function getScoreLevel(score: number) {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Low';
  }

  function abbreviateName(name: string) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      const firstName = parts[0];
      const lastName = parts[1];
      return `${firstName.charAt(0)}.${lastName.substring(0, Math.min(5, lastName.length))}`;
    }
    return name.substring(0, 7);
  }
</script>

<div class="heatmap-container">
  <div class="heatmap-header">
    <div>
      <h2>Employee Coaching Heatmap</h2>
      <p class="description">Visual overview of coaching distribution and engagement</p>
    </div>
    <div class="filters">
      <div class="filter-group overlay-filter">
        <button
          class="filter-button"
          class:active={overlayFilter === 'None'}
          on:click={() => setOverlayFilter('None')}
        >
          None
        </button>
        <button
          class="filter-button"
          class:active={overlayFilter === 'Skill/Will'}
          on:click={() => setOverlayFilter('Skill/Will')}
        >
          Skill/Will
        </button>
      </div>
      <div class="filter-group metric-filter">
        <button
          class="filter-button"
          class:active={metricFilter === 'Recency'}
          on:click={() => setMetricFilter('Recency')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Recency
        </button>
        <button
          class="filter-button"
          class:active={metricFilter === 'Frequency'}
          on:click={() => setMetricFilter('Frequency')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter-icon">
            <path d="M3 3v18h18"></path>
            <path d="M18 17V9"></path>
            <path d="M13 17V5"></path>
            <path d="M8 17v-3"></path>
          </svg>
          Frequency
        </button>
        <button
          class="filter-button"
          class:active={metricFilter === 'Performance'}
          on:click={() => setMetricFilter('Performance')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter-icon">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          Performance
        </button>
      </div>
    </div>
  </div>
  
  <div class="legend">
    <span class="legend-label">Current Performance Score</span>
    <div class="legend-items">
      <span class="legend-item"><span class="dot" style="background: linear-gradient(135deg, #f87171, #ef4444);"></span> Low (60-70)</span>
      <span class="legend-item"><span class="dot" style="background: linear-gradient(135deg, #facc15, #eab308);"></span> Fair (70-80)</span>
      <span class="legend-item"><span class="dot" style="background: linear-gradient(135deg, #4ade80, #22c55e);"></span> Good (80-90)</span>
      <span class="legend-item"><span class="dot" style="background: linear-gradient(135deg, #60a5fa, #3b82f6);"></span> Excellent (90+)</span>
    </div>
  </div>

  <div class="heatmap">
    {#each teams as team}
      <div class="team-row">
        <div class="team-label">{team}</div>
        <div class="employees-grid">
          {#each getEmployeesByTeam(team) as employee}
            {@const colors = getScoreColor(employee.performanceScore)}
            <div
              class="cell"
              style="background: linear-gradient(to bottom right, {colors.from}, {colors.to});"
              title="{employee.name} - Score: {employee.performanceScore}"
            >
              <span class="name">{abbreviateName(employee.name)}</span>
              <span class="score">{employee.performanceScore}</span>
              <div class="tooltip">
                <div class="tooltip-name">{employee.name}</div>
                <div class="tooltip-info">{team} • {employee.channel} • {employee.coach}</div>
                <div class="tooltip-info">Score: {employee.performanceScore} • Trend: {employee.trend}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="divider"></div>

  <CoachingSessions {sessions} />
</div>

<style>
  .heatmap-container {
    padding: 2rem;
    background: white;
    margin: 0 2rem 2rem 2rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }
  
  .heatmap-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .heatmap-header h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .description {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
  }

  .filters {
    display: flex;
    gap: 0.75rem;
  }

  .filter-group {
    display: flex;
    background: #f3f4f6;
    border-radius: 0.5rem;
    padding: 0.25rem;
  }

  .overlay-filter .filter-button {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }

  .metric-filter .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .filter-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-button:hover {
    color: #111827;
  }

  .filter-button.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }

  .filter-icon {
    height: 0.75rem;
    width: 0.75rem;
  }
  
  .legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 6px;
  }
  
  .legend-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }
  
  .legend-items {
    display: flex;
    gap: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .heatmap {
    overflow-x: auto;
  }

  .team-row {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    align-items: center;
  }

  .team-label {
    min-width: 80px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    padding: 0.5rem;
  }

  .employees-grid {
    display: grid;
    grid-template-columns: repeat(20, minmax(50px, 60px));
    gap: 4px;
    flex: 1;
  }
  
  .cell {
    aspect-ratio: 1;
    min-height: 50px;
    max-height: 60px;
    border-radius: 4px;
    border: 2px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    padding: 0.125rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    z-index: 1;
  }

  .cell:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

  .name {
    font-weight: 700;
    font-size: 0.4375rem; /* 7px */
    color: white;
    line-height: 1.2;
    text-align: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 0.125rem;
  }

  .score {
    font-weight: 700;
    font-size: 0.625rem; /* 10px */
    color: rgba(255, 255, 255, 0.9);
  }

  .tooltip {
    position: absolute;
    top: -5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem;
    background: #111827;
    color: white;
    font-size: 0.75rem;
    border-radius: 0.5rem;
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
    z-index: 20;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    transition: opacity 0.2s ease;
  }

  .cell:hover .tooltip {
    opacity: 1;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    border: 4px solid transparent;
    border-top-color: #111827;
  }

  .tooltip-name {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .tooltip-info {
    color: #d1d5db;
    font-size: 0.6875rem;
  }

  .divider {
    height: 1px;
    background: #e5e7eb;
    margin: 2rem 0;
  }
</style>