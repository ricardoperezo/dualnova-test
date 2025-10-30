<script lang="ts">
  export let metrics: any;
  
  const cards = [
    {
      icon: '🎯',
      title: 'Total Sessions',
      subtitle: 'This week',
      value: metrics?.totalSessions || 0,
      change: metrics?.totalSessionsChange || 0
    },
    {
      icon: '👥',
      title: 'Agent Coverage',
      subtitle: '55 of 100',
      value: `${metrics?.agentCoverage || 0}%`,
      change: metrics?.agentCoverageChange || 0
    },
    {
      icon: '📈',
      title: 'Behavior Change Index',
      subtitle: 'Avg improvement',
      value: `${metrics?.behaviorChangeIndex || 0}%`,
      change: metrics?.behaviorChangeIndexChange || 0
    },
    {
      icon: '💰',
      title: 'ROI Generated',
      subtitle: 'Est. value created',
      value: `$${(metrics?.roiGenerated || 0) / 1000}k`,
      change: metrics?.roiGeneratedChange || 0
    },
    {
      icon: '⚖️',
      title: 'Skill vs Will Focus',
      subtitle: 'Training balance',
      value: `${metrics?.skillFocus || 60}/${metrics?.willFocus || 40}`,
      change: metrics?.skillWillChange || 0
    }
  ];
</script>

<div class="metrics-grid">
  {#each cards as card}
    <div class="metric-card">
      <div class="card-header">
        <span class="icon">{card.icon}</span>
        <span class="change" class:positive={card.change > 0} class:negative={card.change < 0}>
          {card.change > 0 ? '↗' : '↘'} {Math.abs(card.change)}%
        </span>
      </div>
      
      <div class="card-body">
        <h3 class="value">{card.value}</h3>
        <p class="title">{card.title}</p>
        <p class="subtitle">{card.subtitle}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }
  
  .metric-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .metric-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .icon {
    font-size: 1.5rem;
  }
  
  .change {
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  .change.positive {
    color: #10b981;
  }
  
  .change.negative {
    color: #ef4444;
  }
  
  .value {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.5rem 0;
  }
  
  .title {
    font-size: 0.95rem;
    color: #374151;
    margin: 0 0 0.25rem 0;
  }
  
  .subtitle {
    font-size: 0.85rem;
    color: #9ca3af;
    margin: 0;
  }
</style>