import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/app/app.component';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (import.meta.env.DEV) {
  const { worker } = await import('~/mocks/browser');
  worker.start();
}
