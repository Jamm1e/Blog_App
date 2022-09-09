import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'simplebar/dist/simplebar.min.css';
import { ThemeProvider} from '@mui/material';
import lightTheme from './themes/defaultTheme';

import AuthState from './context/auth_context/AuthState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <AuthState>
        <App />
      </AuthState>
      
    </ThemeProvider>
    
  </React.StrictMode>
);
