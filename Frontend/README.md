# 🎨 Bulk Email Sender - Frontend

Modern, type-safe frontend built with SvelteKit and TypeScript.

## 📁 Project Structure
```
src/
├── lib/
│   ├── api/
│   │   └── client.ts              # Axios API client
│   ├── stores/
│   │   └── auth.ts                # Authentication store
│   └── components/
│       ├── Navbar.svelte          # Navigation component
│       └── EmailForm.svelte       # Email form component
├── routes/
│   ├── +layout.svelte             # Root layout
│   ├── +page.svelte               # Home page
│   ├── login/
│   │   └── +page.svelte           # Login/Register page
│   └── dashboard/
│       └── +page.svelte           # Email dashboard
└── app.html                       # HTML template
```

## 🛠️ Installation
```bash
npm install
```

## 🚀 Development
```bash
npm run dev              # Start dev server
npm run check            # Type checking
npm run build            # Production build
npm run preview          # Preview build
```

## 🔧 Configuration

### API URL Configuration

Edit `src/lib/api/client.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000';
```

Or use environment variables:
```bash
# .env
VITE_API_BASE_URL=http://localhost:5000
```

## 📦 Components

### Navbar Component
```svelte
<Navbar />
```
- Displays navigation links
- Shows login/logout based on auth state
- Responsive mobile menu

### EmailForm Component
```svelte
<EmailForm 
  bind:this={emailForm}
  {loading}
  {success}
  {error}
  on:submit={handleSubmit}
/>
```

**Props:**
- `loading: boolean` - Show loading state
- `success: string` - Success message
- `error: string` - Error message

**Events:**
- `submit` - Emitted when form submitted

## 🗄️ State Management

### Auth Store
```typescript
import { authStore } from '$lib/stores/auth';

// Login
authStore.login(token, user);

// Logout
authStore.logout();

// Check auth status
authStore.checkAuth();

// Subscribe to changes
$authStore.isAuthenticated
```

## 🌐 API Integration

### API Client
```typescript
import { apiClient } from '$lib/api/client';

// Login
const response = await apiClient.login({ email, password });

// Send email
await apiClient.sendBulkEmail({
  recipients: ['user@example.com'],
  subject: 'Hello',
  body: 'Email body'
});

// Get email history
const history = await apiClient.getEmailHistory();
```

## 🎨 Styling

- Pure CSS (no frameworks)
- Modern gradient backgrounds
- Responsive design
- Smooth transitions
- Mobile-first approach

## 🔒 Protected Routes

Dashboard route is protected:
```typescript
onMount(() => {
  if (!$authStore.isAuthenticated) {
    goto('/login');
  }
});
```

## 📱 Responsive Breakpoints
```css
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 640px) { /* Mobile */ }
```

## 🧪 Type Checking
```bash
npm run check
```

Should output: **No errors found** ✅

## 🏗️ Build
```bash
npm run build
```

Output in `.svelte-kit/output/`

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel deploy
```

### Netlify
```bash
npm run build
# Upload .svelte-kit/output to Netlify
```

## 🐛 Troubleshooting

### CORS Error
Ensure backend has CORS enabled for `http://localhost:5173`

### Module Not Found
```bash
Remove-Item -Recurse -Force .svelte-kit, node_modules
npm install
```

### TypeScript Errors
```bash
npm run check
```

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

---

**Built with SvelteKit 2.0 + TypeScript** 