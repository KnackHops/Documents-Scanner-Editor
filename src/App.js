import './App.css';
import ErrorBoundary from './wrappers/ErrorBoundary';
import DocumentsScannerEditor from './wrappers/DocumentsScannerEditor';
import getConnect from './wrappers/SocketConnection';
import { createContext, useEffect, useState } from 'react';

const SocketContext = createContext(null);

function App() {
  const [ socket, setSocket] = useState(null);
  const [ sockAtt, setSockAtt ] = useState(false);
  
  useEffect( () => {
    getConnect()
    .then( resp => {
      if ( resp?.connected ) {
        setSocket(resp);
      } else {
        setSockAtt(true);
      }
    })
  }, [])

  useEffect( () => {
    if ( socket ) {
      setSockAtt(true);
    }
  }, [ socket ] )

  return (
    <>
      <ErrorBoundary>
        <SocketContext.Provider value={socket}>
          {/* <DocumentsScannerEditor /> */}
          {sockAtt && <DocumentsScannerEditor />}
          {!sockAtt && <h1>Please wait</h1>}
        </SocketContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
export { SocketContext };
