<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { apiClient } from '$lib/api/client';
  // import { getUser, getEmailHistory } from '../../lib/api/client';

  import Navbar from '$lib/components/Navbar.svelte';

  let recipients = '';
  let subject = '';
  let body = '';
  let loading = false;
  let success = '';
  let error = '';

//   // Fix variable types:
// let user: any = null;
// let emailHistory: any[] = [];

// // Fix function parameters:
// apiClient.getEmailHistory().then((history: any) => {
//   emailHistory = history;
// }).catch((err: any) => {
//   console.error('Failed to refresh email history:', err);
// });

  onMount(() => {
    if (!$authStore.isAuthenticated) {
      goto('/login');
    }
  });

  async function handleSendEmail() {
    if (!recipients || !subject || !body) {
      error = 'Please fill in all fields';
      return;
    }

    const recipientList = recipients
      .split('\n')
      .map((email) => email.trim())
      .filter((email) => email);

    if (recipientList.length === 0) {
      error = 'Please enter at least one recipient';
      return;
    }

    loading = true;
    error = '';
    success = '';

    try {
      await apiClient.sendBulkEmail({
        recipients: recipientList,
        subject,
        body,
      });

      success = `Successfully sent emails to ${recipientList.length} recipient(s)!`;
      recipients = '';
      subject = '';
      body = '';
    } catch (err: any) {
      error = err.response?.data?.message || 'Failed to send emails. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<Navbar />

<div class="dashboard-container">
  <div class="dashboard-content">
    <h1>Send Bulk Emails</h1>

    {#if success}
      <div class="success-message">{success}</div>
    {/if}

    {#if error}
      <div class="error-message">{error}</div>
    {/if}

    <form on:submit|preventDefault={handleSendEmail}>
      <div class="form-group">
        <label for="recipients">
          Recipients
          <span class="hint">(One email per line)</span>
        </label>
        <textarea
          id="recipients"
          bind:value={recipients}
          placeholder="example1@email.com&#10;example2@email.com&#10;example3@email.com"
          rows="6"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          type="text"
          id="subject"
          bind:value={subject}
          placeholder="Enter email subject"
          required
        />
      </div>

      <div class="form-group">
        <label for="body">Message</label>
        <textarea
          id="body"
          bind:value={body}
          placeholder="Enter your email message here..."
          rows="10"
          required
        ></textarea>
      </div>

      <button type="submit" class="send-btn" disabled={loading}>
        {loading ? 'Sending...' : 'Send Emails'}
      </button>
    </form>
  </div>
</div>

<style>
  .dashboard-container {
    min-height: calc(100vh - 60px);
    background-color: #f5f5f5;
    padding: 2rem;
  }

  .dashboard-content {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0 0 2rem 0;
    color: #333;
    text-align: center;
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

  .hint {
    font-size: 0.875rem;
    color: #666;
    font-weight: normal;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #4CAF50;
  }

  textarea {
    resize: vertical;
  }

  .send-btn {
    width: 100%;
    padding: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .send-btn:hover:not(:disabled) {
    background-color: #45a049;
  }

  .send-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .success-message {
    background-color: #e8f5e9;
    color: #2e7d32;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    text-align: center;
  }
</style>