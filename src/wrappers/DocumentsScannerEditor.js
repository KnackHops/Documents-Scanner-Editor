import { useState, useEffect, createContext } from "react";
import Headers from '../components/Headers/Headers';
import UserMenu from '../components/UserMenu/UserMenu';
import Home from '../components/Home/Home';

const UserContext = createContext(null);
const FunctionContext = createContext(null);

export default  function DocumentsScannerEditor() {
    const [logIn, setLogIn] = useState(false);
    const [user, setUser] = useState(null);
    const [openMenu, setOpen] = useState(null);

    const logInHandle = (_user = null) => {
        setUser(_user);
        if(_user){
            setLogIn(true);
        }else{
            setLogIn(false);
        }
    }

    const menuHandler = (whichFrom=null) =>{
        setOpen(whichFrom);
    }

    useEffect(()=>{
        console.log(user)
    }, [user])

    return (
        <>
            <FunctionContext.Provider value={{
                logInHandle, 
                menuHandler
            }}>
                <UserContext.Provider value={{
                    id: user ? user.id : null,
                    username: user ? user.username : null,
                    role: user ? user.role : null,
                    mobile: user ? user.mobile : null
                }}>
                    {
                        openMenu && <UserMenu openMenu={openMenu}/>
                    }
                    <Headers 
                        logIn={logIn}/>
                    <Home 
                        logIn={logIn}/>

                </UserContext.Provider>
            </FunctionContext.Provider>
        </>
    )
}

export { UserContext, FunctionContext };