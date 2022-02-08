import React from 'react';
import GlobalContext from './wrapper/GlobalContext';
import Routes from './wrapper/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <GlobalContext>
      <>
        <Toaster />
        <Routes />
      </>
    </GlobalContext>
  );
}

export default App;
