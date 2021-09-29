import { useState, useEffect, createContext } from "react";
import Headers from '../components/Headers/Headers';
import UserMenu from '../components/UserMenu/UserMenu';
import Home from '../components/Home/Home';

const UserContext = createContext(null);
const FunctionContext = createContext(null);
const SideContext = createContext(null);
const DocumentContext = createContext(null);

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

    const [documentList, setDocumentList] = useState(null);

    const documentFetch = () =>{
        fetch('http://127.0.0.1:5000/document/fetch',{
                method: 'GET',
                mode: 'cors'
            }).then(resp=>{
                if(resp.ok){
                    return resp.json()
                }else{
                    throw Error("error fetching!");
                }
            }).then(({documents})=>{
                setDocumentList({documents});
            }).catch(err=>{
                console.log(err);
            })
    }

    useEffect(()=>{
        documentFetch();
    }, [])

    const [sideUser, setSideUser] = useState(null);

    const searchHandler = (arr, search, fromWhere) => {
        let _arr = fromWhere === 'document' ? {documents: []} : [];

        arr.forEach(item => {
            if(fromWhere === 'user'){
                if(item?.username.includes(search) || item?.id === Number(search)){
                    if('isSubordinate' in item){
                        if(!item.isSubordinate){
                            _arr.push({
                                id: item.id,
                                username: item.username
                            })
                        }
                    }
                }
            }else if(fromWhere === 'document'){
                if(item?.id === Number(search) || item?.title?.includes(search)){
                    _arr.documents.push({
                        id: item.id,
                        title: item.title
                    })
                }
            }
        })

        if(search && (_arr.length > 0 || _arr.documents.length > 0)){
            return _arr
        }else{
            return null
        }
    }

    return (
        <>
            <FunctionContext.Provider value={{
                logInHandle, 
                menuHandler,
                searchHandler
            }}>
                <UserContext.Provider value={{
                    id: user ? user.id : null,
                    username: user ? user.username : null,
                    role: user ? user.role : null,
                    mobile: user ? user.mobile : null,
                    email: user ? user.email : null
                }}>
                    <SideContext.Provider value={{
                        setSideUser,
                        sideUser
                    }}>
                    {
                        openMenu && <UserMenu openMenu={openMenu}/>
                    }
                    </SideContext.Provider>
                    <DocumentContext.Provider value={{
                        documentList,
                        documentFetch
                    }}>
                        <Headers 
                            logIn={logIn}/>
                        <Home 
                            logIn={logIn}/>
                    </DocumentContext.Provider>
                </UserContext.Provider>
            </FunctionContext.Provider>
        </>
    )
}

export { UserContext, FunctionContext, SideContext, DocumentContext };