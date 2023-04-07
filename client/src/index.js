import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/user/UserContext';
import { QuoteContextProvider } from './context/quotes/QuoteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QuoteContextProvider>
        <App />
      </QuoteContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
