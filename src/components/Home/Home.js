import './Home-style.css'
import LandingPage from './LandingPage/LandingPage';
import DocumentCentral from './DocumentCentral/DocumentCentral';

const Home = ({ logIn }) => {
    const classForArticle = logIn ? "homepage-container" : "landingpage-container";

    return (
        <main className={`fd ${classForArticle}`}>
            {logIn ? 
            <DocumentCentral /> :
            <LandingPage />}
        </main>
    )
}

export default Home;