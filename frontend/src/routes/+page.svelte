<script lang="ts">
  import { onMount } from 'svelte';
  import { graphqlClient, GET_DASHBOARD_DATA } from '$lib/graphql';
  import Header from '$lib/components/Header.svelte';
  import MetricsCards from '$lib/components/MetricsCards.svelte';
  import EmployeeHeatmap from '$lib/components/EmployeeHeatmap.svelte';

  let data: any = null;
  let loading = true;

  onMount(async () => {
    try {
      data = await graphqlClient.request(GET_DASHBOARD_DATA);
      loading = false;
    } catch (error) {
      console.error('Error fetching data:', error);
      loading = false;
    }
  });

  const lastUpdated = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
</script>

<div class="app">
  {#if loading}
    <div class="loading">Loading...</div>
  {:else if data}
    <Header {lastUpdated} />
    <MetricsCards metrics={data.metrics} />
    <EmployeeHeatmap employees={data.employees} sessions={data.coachingSessions} />
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f9fafb;
  }
  
  .app {
    min-height: 100vh;
  }
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
    color: #6b7280;
  }
</style>