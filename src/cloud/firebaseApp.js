import { initializeApp, getApps } from 'firebase/app';

function readEnv(key) {
  // Vite injects env at build time.
  return import.meta.env[key] ?? '';
}

export function getFirebaseConfig() {
  const config = {
    apiKey: readEnv('VITE_FIREBASE_API_KEY'),
    authDomain: readEnv('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: readEnv('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: readEnv('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: readEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: readEnv('VITE_FIREBASE_APP_ID'),
  };

  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missing = requiredKeys.filter((k) => !config[k]);
  if (missing.length) return null;
  return config;
}

export function getFirebaseApp() {
  const config = getFirebaseConfig();
  if (!config) return null;
  const existing = getApps();
  if (existing.length) return existing[0];
  return initializeApp(config);
}

