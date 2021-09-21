import { useState, useEffect } from "react";
import './Headers-style.css';

const Headers = ({logIn, testLogInHandle}) => {
    let classForHead = logIn ? "homepage-header" : "landingpage-header";

    return (
        <header className={`fd ${classForHead}`}>
            <div className="icon" onClick={()=>testLogInHandle()}>
                Doc
            </div>
            {logIn ? <>
                <p className="searchbar-container">
                    <input className="searchbar" aria-label="Searchbar" type="text" />
                </p>
                <nav>
                    <ul className="fd">
                        <li><button>Scan</button></li>
                        <li><button>Profile</button></li>
                    </ul>
                </nav> 
            </> : ""}
            
        </header>
    )
}

export default Headers;