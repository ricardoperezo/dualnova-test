<script lang="ts">
  export let lastUpdated: string = '';

  let selectedPeriod = 'Quarter';
  let isRiskAdjusted = false;

  function handlePeriodChange(period: string) {
    selectedPeriod = period;
  }

  function toggleMetrics() {
    isRiskAdjusted = !isRiskAdjusted;
  }
</script>

<header class="header">
  <div class="left-section">
    <div class="logo">📊</div>
    <div class="title-section">
      <h1>Coaching Impact Command Center</h1>
      <p class="subtitle">Real-time coaching analytics and performance insights</p>
    </div>
  </div>

  <div class="right-section">
    <button class="icon-button-text" aria-label="Help">
      <span class="icon-circle">?</span>
    </button>

    <div class="last-updated-box">
      <span class="calendar-icon">📅</span>
      <div class="update-text">
        <span class="label">Last updated:</span>
        <span class="time">{lastUpdated}</span>
      </div>
    </div>

    <div class="metrics-toggle">
      <span class="metrics-label">Metrics:</span>
      <button class="toggle-button" on:click={toggleMetrics}>
        {#if isRiskAdjusted}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toggle-icon active">
            <rect width="20" height="12" x="2" y="6" rx="6" ry="6"></rect>
            <circle cx="16" cy="12" r="2"></circle>
          </svg>
          <span class="toggle-text active">Risk-Adjusted</span>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toggle-icon">
            <rect width="20" height="12" x="2" y="6" rx="6" ry="6"></rect>
            <circle cx="8" cy="12" r="2"></circle>
          </svg>
          <span class="toggle-text">Raw</span>
        {/if}
      </button>
    </div>

    <button class="control-button">⬇️ Export</button>
    <button class="control-button">🔍 Filters</button>

    <div class="period-selector">
      <button 
        class="period-button" 
        class:active={selectedPeriod === 'Week'}
        on:click={() => handlePeriodChange('Week')}
      >
        Week
      </button>
      <button 
        class="period-button" 
        class:active={selectedPeriod === 'Month'}
        on:click={() => handlePeriodChange('Month')}
      >
        Month
      </button>
      <button 
        class="period-button" 
        class:active={selectedPeriod === 'Quarter'}
        on:click={() => handlePeriodChange('Quarter')}
      >
        Quarter
      </button>
    </div>
  </div>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    background: transparent;
    gap: 1rem;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: auto;
    flex: 1 1 auto;
  }

  .logo {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .title-section {
    min-width: auto;
  }

  .title-section h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }

  .subtitle {
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    flex-shrink: 0;
    justify-content: flex-end;
  }

  .icon-button-text {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }

  .icon-button-text:hover {
    opacity: 0.7;
  }

  .icon-circle {
    width: 20px;
    height: 20px;
    border: 2px solid #9ca3af;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    color: #9ca3af;
  }

  .last-updated-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
  }

  .calendar-icon {
    font-size: 1rem;
    filter: grayscale(1);
    opacity: 0.6;
  }

  .update-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .update-text .label {
    font-size: 0.75rem;
    color: #9ca3af;
    line-height: 1;
  }

  .update-text .time {
    font-size: 0.8rem;
    font-weight: 500;
    color: #6b7280;
    line-height: 1.2;
  }

  .metrics-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: white;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }

  .metrics-label {
    font-size: 0.875rem;
    color: #4b5563;
  }

  .toggle-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .toggle-icon {
    height: 1.25rem;
    width: 1.25rem;
    color: #9ca3af;
    transition: color 0.2s;
  }

  .toggle-icon.active {
    color: #3b82f6;
  }

  .toggle-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    transition: color 0.2s;
  }

  .toggle-text.active {
    color: #3b82f6;
  }

  .control-button {
    display: flex;
    align-items: center;
    gap: 0.qrem;
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
  }

  .control-button:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  .period-selector {
    display: flex;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border: 1px solid #e5e7eb;
    padding: 0.25rem;
  }

  .period-button {
    padding: 0.5rem 1rem;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s;
  }

  .period-button:hover {
    color: #111827;
  }

  .period-button.active {
    background: #3b82f6;
    color: white;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
</style>