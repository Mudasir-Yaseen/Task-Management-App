// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import the Redux store
import App from './App'; // Ensure this matches your file structure // Import AuthProvider
import './index.css'; // If you have global styles
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider */}
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
