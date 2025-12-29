<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';

  onMount(() => {
    authStore.checkAuth();
  });
</script>

<slot />

<style global>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
  }
</style>