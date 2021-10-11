import './Home-style.css'
import LandingPage from './LandingPage/LandingPage';
import DocumentCentral from './DocumentCentral/DocumentCentral';
import { useContext, useLayoutEffect } from 'react';
import { MenuContext, SideContext } from '../../wrappers/DocumentsScannerEditor';
import PopUpAside from '../../wrappers/PopUpAside';
import UserMenu from '../UserMenu/UserMenu';

const Home = ({ logIn }) => {
    const { popUp, openMenu } = useContext(MenuContext);
    const {setAttached} = useContext(SideContext);

    const windowWidth = () => {
        if(window.innerWidth >= 1050){
            setAttached(true)
        }else if(window.innerWidth <= 1049){
            setAttached(false)
        }
    }

    useLayoutEffect(()=>{
        windowWidth();
        window.addEventListener("resize", windowWidth);
        return ()=>window.removeEventListener("resize", windowWidth)
    }, [])

    const classForMain = logIn ? "homepage-container" : "landingpage-container";

    return (
        <main className={`${classForMain}`} >
            {popUp.openUp ? 
                <PopUpAside fromWhere={popUp.fromWhere}>
                    {popUp.Compo}
                </PopUpAside> : ""}
             {openMenu && <UserMenu openMenu={openMenu}/>}
            {logIn ? 
            <DocumentCentral /> :
            <LandingPage />}
        </main>
    )
}

export default Home;