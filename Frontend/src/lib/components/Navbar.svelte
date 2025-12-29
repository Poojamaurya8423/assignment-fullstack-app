<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  function handleLogout() {
    authStore.logout();
    goto('/login');
  }
</script>

<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="nav-brand">Bulk Email Sender</a>
    
    <div class="nav-links">
      <a href="/">Home</a>
      
      {#if $authStore.isAuthenticated}
        <a href="/dashboard">Dashboard</a>
        <button on:click={handleLogout} class="logout-btn">Logout</button>
      {:else}
        <a href="/login">Login</a>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: #333;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-brand {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav-links a:hover {
    color: #4CAF50;
  }

  .logout-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .logout-btn:hover {
    background-color: #d32f2f;
  }
</style>