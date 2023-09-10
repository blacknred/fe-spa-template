import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from "virtual:pwa-register";
import { App } from './App.tsx';
import { API_MOCKING, IS_DEV, IS_PROD } from '../../admin-spa/src/config/index.ts';
import './index.css';
import { reportWebVitals } from './reportWebVitals';

function render() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (IS_DEV && API_MOCKING) {
  void import('@/mocks/browser').then(({ worker }) => worker?.start().then(render))
} else {
  render();
}

if (IS_PROD) {
  // run web vitals
  reportWebVitals(console.log)

  // refresh sw cache with confirmation
  if ("serviceWorker" in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm("New content available. Reload?")) {
          void updateSW(true);
        }
      },
    });
  }
}

