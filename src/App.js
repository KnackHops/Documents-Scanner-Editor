import './App.css';
import ErrorBoundary from './wrappers/ErrorBoundary';
import DocumentsScannerEditor from './wrappers/DocumentsScannerEditor';

function App() {

  return (
    <>
      <ErrorBoundary>
        <DocumentsScannerEditor />
      </ErrorBoundary>
    </>
  );
}

export default App;
