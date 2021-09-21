import './App.css';
import { useState, useEffect } from 'react';
import ErrorBoundary from './wrappers/ErrorBoundary';
import Headers from './components/Headers/Headers';
import Home from './components/Home/Home'; 

function App() {
  const [logIn, setLogIn] = useState(false);

  const testLogInHandle = () => {
    setLogIn(!logIn);
  }

  return (
    <>
      <ErrorBoundary>
        <Headers logIn={logIn} testLogInHandle={testLogInHandle}/>
        <Home logIn={logIn} />
        <footer>
                <p>Source code https://github.com/KnackHops/documents-scanner-editor</p>
                <p>Developed by KnackHops</p>
        </footer>
      </ErrorBoundary>
    </>
  );
}

export default App;
