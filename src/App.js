import './App.css';
// import { useState, createContext } from 'react';
import ErrorBoundary from './wrappers/ErrorBoundary';
import DocumentsScannerEditor from './wrappers/DocumentsScannerEditor';
// import Headers from './components/Headers/Headers';
// import Home from './components/Home/Home'; 
// import UserMenu from './components/UserMenu/UserMenu';
// import { useEffect } from 'react/cjs/react.development';

// const UserContext = createContext(null);

function App() {
  // const [logIn, setLogIn] = useState(false);
  // const [user, setUser] = useState(null);
  // const [openMenu, setOpen] = useState(null);

  // const logInHandle = (_user = null) => {
  //   setUser(_user);
  //   if(_user){
  //     setLogIn(true);
  //   }else{
  //     setLogIn(false);
  //   }
  // }

  // const menuHandler = (whichFrom=null) =>{
  //   setOpen(whichFrom);
  // }

  // useEffect(()=>{
  //   console.log(user)
  // }, [user])

  return (
    <>
      <ErrorBoundary>
        <DocumentsScannerEditor />
        {/* <UserContext.Provider value={{
          id: user ? user.id : null,
          username: user ? user.username : null,
          role: user ? user.role : null
        }}>
          {openMenu && <UserMenu menuHandler={menuHandler} openMenu={openMenu}/>}
          <Headers logIn={logIn} logInHandle={logInHandle} menuHandler={menuHandler}/>
        </UserContext.Provider>
        <Home logIn={logIn} logInHandle={logInHandle}/>
         */}
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
