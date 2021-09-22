import { useState, useEffect } from "react";
import './Home-style.css'
import DocumentCentral from './DocumentCentral/DocumentCentral';
import LandingPage from "./LandingPage/LandingPage";

const Home = ({logIn}) => {
    const classForArticle = logIn ? "homepage-container" : "landingpage-container";

    return (
        <article className={`fd ${classForArticle}`}>
            {logIn ? <DocumentCentral /> : <LandingPage />}
        </article>
    )
}

export default Home;