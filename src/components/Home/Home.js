import { useState, useEffect } from "react";
import './Home-style.css'
import DocumentPage from './DocumentPage/DocumentPage';
import LandingPage from "./LandingPage/LandingPage";

const Home = ({logIn}) => {
    const classForArticle = logIn ? "homepage-container" : "landingpage-container";

    return (
        <article className={`fd ${classForArticle}`}>
            {logIn ? <DocumentPage /> : <LandingPage />}
        </article>
    )
}

export default Home;