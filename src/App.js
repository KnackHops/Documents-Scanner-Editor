import './App.css';
// import { useState, createContext } from 'react';
import ErrorBoundary from './wrappers/ErrorBoundary';
import DocumentsScannerEditor from './wrappers/DocumentsScannerEditor';

function App() {

  return (
    <>
      <ErrorBoundary>
        <DocumentsScannerEditor />
         <footer>
            <p>Source code https://github.com/KnackHops/documents-scanner-editor</p>
            <p>Developed by KnackHops</p>
        </footer>
      </ErrorBoundary>
    </>
  );
}

export default App;
// export { UserContext };
