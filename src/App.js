import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import AppProvider from './context/AppProvider';
import Routes from './Routes';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
