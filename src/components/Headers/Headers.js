import { useContext } from "react";
import './Headers-style.css';
import { UserContext, FunctionContext} from '../../wrappers/DocumentsScannerEditor';
import { useEffect, useState } from "react/cjs/react.development";
import ProfilePanel from "./ProfilePanel";

const Headers = ({logIn}) => {
    const classForHead = logIn ? "homepage-header" : "landingpage-header";
    const { username, role } = useContext(UserContext);
    const { logInHandle, menuHandler } = useContext(FunctionContext);

    const bodyEventListener_panel = e => {
        if(e.target.className !== 'panel-btn-container' && e.target.className !== 'panel-btn' && e.target.className !== 'nav-btn'){
            if(panelStatus==='active'){
                setPanel('inactive');
            }
        }
    }

    const [panelStatus, setPanel] = useState("inactive");

    const panelClicked = (e=null) => {
        if(e){
            e.preventDefault();
        }
        panelStatus === 'active' ? setPanel("inactive") : setPanel("active");
    }

    useEffect(()=>{
        const body = document.querySelector('body');
        if(logIn){
            if(panelStatus === 'active'){
                body.addEventListener('click', bodyEventListener_panel);
            }else{
                body.removeEventListener('click', bodyEventListener_panel);
        }}
        return ()=>{
            if(panelStatus==='active'){
                body.removeEventListener('click', bodyEventListener_panel);
            }
        }
    }, [panelStatus])

    const menuClicked = e => {
        const fromWhere = e.target.getAttribute('data');
        setPanel("inactive");
        menuHandler(fromWhere);
    }

    const logOutHandler = () => {
        logInHandle();
    }

    return (
        <header className={`fd ${classForHead}`}>
            <div className="icon">
                Doc
            </div>
            {logIn ? <>
                <p className="searchbar-container">
                    <input className="searchbar" aria-label="Searchbar" type="text" />
                </p>
                <nav>
                    <ul className="fd nav-list">
                        <li><button>Scan</button></li>
                        <li><button className="nav-btn" onClick={panelClicked}>{username}</button></li>
                    </ul>
                </nav>
                <ProfilePanel 
                    panelStatus={panelStatus} 
                    menuClicked={menuClicked} 
                    logOutHandler={logOutHandler}
                    role={role}/>
            </> : ""}
        </header>
    )
}

export default Headers;