import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/globalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  if (event.error && event.error.message === 'Network Error') {
    // Display message when encountering network errors
    console.log('Internet connection lost or server is down.');
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <GlobalStyle />
        <GlobalProvider>
          <App internetConnection={false} />
          <ToastContainer />
        </GlobalProvider>
      </React.StrictMode>
    );
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <App internetConnection={true} />
      <ToastContainer />
    </GlobalProvider>
  </React.StrictMode>
);
