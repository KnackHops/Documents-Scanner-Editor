import './Home-style.css'
import LandingPage from './LandingPage/LandingPage';
import DocumentCentral from './DocumentCentral/DocumentCentral';
import { 
    useContext, 
    useLayoutEffect, 
    createContext
} from 'react';
import { 
    MenuContext, 
    SideContext 
} from '../../wrappers/DocumentsScannerEditor';
import PopUpAside from '../../wrappers/PopUpAside';
import UserMenu from '../UserMenu/UserMenu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

const RouteContext = createContext(null);


const Home = ({ logIn, socket }) => {
    const { popUp, openMenu } = useContext(MenuContext);
    const { setAttached } = useContext(SideContext);

    const windowWidth = () => {
        if(window.innerWidth >= 1050){
            setAttached(true)
        }else if(window.innerWidth <= 1049){
            setAttached(false)
        }
    }

    useLayoutEffect( () => {
        windowWidth();
        window.addEventListener("resize", windowWidth);
        return ()=>window.removeEventListener("resize", windowWidth)
    }, [])

    const classForMain = logIn ? "homepage-container" : "landingpage-container";

    const RouteChecker = () => {
        // console.log(useLocation())
        return (
            <></>
        )
    }

    return (
        <main className={`${classForMain}`} >
            <Router>
                <RouteChecker />

                {logIn ? <Redirect to="/document-central" /> : <Redirect to="/" />}
                {popUp.openUp ? 
                    <PopUpAside fromWhere={popUp.fromWhere}>
                        {popUp.Compo}
                    </PopUpAside> : ""}

                {openMenu && <UserMenu openMenu={openMenu}/>}

                <Switch>
                    <Route exact path="/">
                        <Redirect to="/landing-page" />
                    </Route>
                    <Route path="/document-central">
                        <>
                        {
                            logIn ? 
                            <DocumentCentral socket={socket} /> :
                            <Redirect to="/landing-page" />
                        }
                        </>
                    </Route>
                    <Route path="/landing-page">
                        <LandingPage />    
                    </Route>
                </Switch>
            </Router>
        </main>
    )
}

export default Home;
export { RouteContext };