import { useContext } from "react";
import './Headers-style.css';
import { UserContext } from '../../App';

const Headers = ({logIn, logInHandle, menuHandler}) => {
    let classForHead = logIn ? "homepage-header" : "landingpage-header";
    const { username, role } = useContext(UserContext);

    const bodyEventListener_panel = e => {
        const parentClassPanel = e.target.parentNode.parentNode.className

        if(!parentClassPanel.includes('nav-list') && 
        !parentClassPanel.includes('profile-list') && 
        !parentClassPanel.includes('profile-panel') && logIn){
            if(document.querySelector('div.profile-panel').classList.contains('active')){
                panelHandler();
            }
        }
    }

    const panelHandler = (e=null) => {
        if(e){
            e.preventDefault();
        }
        const body = document.querySelector('body');
        const profilePanel = document.querySelector('div.profile-panel');

        profilePanel.classList.toggle('active');
        
        if(profilePanel.classList.contains('active')){
            body.addEventListener('click', bodyEventListener_panel)
        }else{
            body.removeEventListener('click', bodyEventListener_panel)
        }
    }

    const panelClicked = e => {
        const fromWhere = e.target.getAttribute('data');
        panelHandler();
        menuHandler(fromWhere);
    }

    const logOutHandler = () => {
        panelHandler();
        logInHandle();
    }

    return (
        <header className={`fd ${classForHead}`}>
            <div className="icon" onClick={logInHandle}>
                Doc
            </div>
            {logIn ? <>
                <p className="searchbar-container">
                    <input className="searchbar" aria-label="Searchbar" type="text" />
                </p>
                <nav>
                    <ul className="fd nav-list">
                        <li><button>Scan</button></li>
                        <li><button onClick={panelHandler}>{username}</button></li>
                    </ul>
                </nav>
                <div className="profile-panel">
                    <ul className="fd profile-list">
                        <li><button onClick={panelClicked} data='profile'>Profile</button></li>
                        {role === 'admin' ? <li><button onClick={panelClicked} data='admin'>Admin</button></li>:""}
                        <li><button onClick={logOutHandler}>Log Out</button></li>
                    </ul>
                </div>
            </> : ""}
        </header>
    )
}

export default Headers;