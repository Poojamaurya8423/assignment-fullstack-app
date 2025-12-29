<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { apiClient } from '$lib/api/client';
  import Navbar from '$lib/components/Navbar.svelte';

  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;


  async function handleSubmit() {
  if (!email || !password) {
    error = 'Please fill in all fields';
    return;
  }

  isLoading = true;
  error = '';

  try {
    if (isLogin) {
      const response = await apiClient.login({ email, password });
      authStore.login(response.token, response.user);
    } else {
      const response = await apiClient.register({ email, password });
      authStore.register(response.token, response.user);
    }
    goto('/dashboard');
  } catch (err: any) {
    error = err.response?.data?.message || 'An error occurred';
  } finally {
    isLoading = false;
  }
}

  function toggleMode() {
    // Toggle between login and register
    isLogin = !isLogin;
  }

  let isLogin = true;
</script>

<Navbar />

<div class="container">
  <div class="form-card">
    <h1>{isLogin ? 'Login' : 'Register'}</h1>
    <p class="subtitle">Please {isLogin ? 'login' : 'register'} to continue</p>

    {#if error}
      <div class="error-message">{error}</div>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" class="submit-btn" disabled={isLoading}>
        {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
      </button>
    </form>

    <p class="toggle-text">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
      <button type="button" class="toggle-btn" on:click={toggleMode}>
        {isLogin ? 'Register' : 'Login'}
      </button>
    </p>
  </div>
</div>

<style>
  .container {
    min-height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    padding: 2rem;
  }

  .form-card {
    background: white;
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  h1 {
    margin: 0 0 0.5rem 0;
    color: #333;
    text-align: center;
  }

  .subtitle {
    color: #666;
    text-align: center;
    margin-bottom: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  input:focus {
    outline: none;
    border-color: #4CAF50;
  }

  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .submit-btn:hover:not(:disabled) {
    background-color: #45a049;
  }

  .submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .toggle-text {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .toggle-btn {
    background: none;
    border: none;
    color: #4CAF50;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    margin-left: 0.25rem;
  }

  .toggle-btn:hover {
    color: #45a049;
  }
</style>
