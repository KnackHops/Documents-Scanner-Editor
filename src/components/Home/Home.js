import './Home-style.css'
import LandingPage from './LandingPage/LandingPage';
import DocumentCentral from './DocumentCentral/DocumentCentral';
import { useContext, useEffect } from 'react/cjs/react.development';
import { MenuContext } from '../../wrappers/DocumentsScannerEditor';
import PopUpAside from '../../wrappers/PopUpAside';
import UserMenu from '../UserMenu/UserMenu';

const Home = ({ logIn }) => {
    const { popUp, openMenu } = useContext(MenuContext);
    const classForArticle = logIn ? "homepage-container" : "landingpage-container";

    return (
        <main className={`fd ${classForArticle}`}>
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