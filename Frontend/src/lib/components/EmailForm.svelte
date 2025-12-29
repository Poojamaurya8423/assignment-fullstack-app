<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  //import type { EmailData } from '$lib/api/client';
  import type { EmailData } from '../api/client';

  const dispatch = createEventDispatcher<{
    submit: EmailData;
  }>();

  export let loading = false;
  export let success = '';
  export let error = '';

  let recipients = '';
  let subject = '';
  let body = '';

  function handleSubmit() {
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

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = recipientList.filter((email) => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      error = `Invalid email format: ${invalidEmails.join(', ')}`;
      return;
    }

    error = '';
    dispatch('submit', {
      recipients: recipientList,
      subject,
      body,
    });
  }

  export function clearForm() {
    recipients = '';
    subject = '';
    body = '';
    error = '';
    success = '';
  }

  // Count recipients
  $: recipientCount = recipients
    .split('\n')
    .map((email) => email.trim())
    .filter((email) => email).length;
</script>

<div class="email-form">
  {#if success}
    <div class="message success-message">
      {success}
    </div>
  {/if}

  {#if error}
    <div class="message error-message">
      {error}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="recipients">
        Recipients
        <span class="hint">(One email per line)</span>
        {#if recipientCount > 0}
          <span class="count">{recipientCount} recipient{recipientCount !== 1 ? 's' : ''}</span>
        {/if}
      </label>
      <textarea
        id="recipients"
        bind:value={recipients}
        placeholder="example1@email.com&#10;example2@email.com&#10;example3@email.com"
        rows="6"
        disabled={loading}
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
        disabled={loading}
        required
      />
    </div>

    <div class="form-group">
      <label for="body">Message</label>
      <textarea
        id="body"
        bind:value={body}
        placeholder="Enter your email message here...&#10;&#10;You can write multiple paragraphs."
        rows="10"
        disabled={loading}
        required
      ></textarea>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary" disabled={loading}>
        {#if loading}
          <span class="spinner"></span>
          Sending...
        {:else}
          📧 Send Emails
        {/if}
      </button>

      {#if !loading && (recipients || subject || body)}
        <button type="button" class="btn btn-secondary" on:click={clearForm}>
          Clear Form
        </button>
      {/if}
    </div>
  </form>
</div>

<style>
  .email-form {
    width: 100%;
  }

  .message {
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 500;
  }

  .success-message {
    background-color: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #81c784;
  }

  .error-message {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #ef5350;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .hint {
    font-size: 0.875rem;
    color: #666;
    font-weight: normal;
    margin-left: 0.5rem;
  }

  .count {
    float: right;
    font-size: 0.875rem;
    color: #4CAF50;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
    background-color: white;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }

  input:disabled,
  textarea:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    flex: 1;
  }

  .btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }

  .btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  .btn-secondary {
    background-color: #f5f5f5;
    color: #666;
    border: 2px solid #e0e0e0;
  }

  .btn-secondary:hover {
    background-color: #e0e0e0;
    border-color: #ccc;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 640px) {
    .form-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }
  }
</style>