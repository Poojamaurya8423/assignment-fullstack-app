<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import { authStore } from '$lib/stores/auth';
</script>

<Navbar />

<div class="home-container">
  <div class="hero">
    <h1>Welcome to Bulk Email Sender</h1>
    <p class="tagline">Send emails to multiple recipients with ease</p>
    
    {#if $authStore.isAuthenticated}
      <a href="/dashboard" class="cta-button">Go to Dashboard</a>
    {:else}
      <div class="cta-group">
        <a href="/login" class="cta-button">Login</a>
      </div>
    {/if}
  </div>

  <div class="features">
    <h2>Features</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>📧 Bulk Sending</h3>
        <p>Send emails to multiple recipients at once</p>
      </div>
      <div class="feature-card">
        <h3>📊 Email History</h3>
        <p>Track all your sent emails</p>
      </div>
      <div class="feature-card">
        <h3>🔒 Secure</h3>
        <p>Your data is safe and encrypted</p>
      </div>
      <div class="feature-card">
        <h3>⚡ Fast</h3>
        <p>Lightning-fast email delivery</p>
      </div>
    </div>
  </div>
</div>

<style>
  .home-container {
    min-height: calc(100vh - 60px);
  }

  .hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  h1 {
    font-size: 3rem;
    margin: 0 0 1rem 0;
  }

  .tagline {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .cta-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: white;
    color: #667eea;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .features {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s;
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }

  .feature-card h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: #667eea;
  }

  .feature-card p {
    color: #666;
    line-height: 1.6;
  }
</style>