import About from "./AboutInfo";
import FooterInfo from "./FooterInfo";
import GeneralLand from "./GeneralLand";
import "./LandingPage-style.css";
import LandPageForm from './LandPageForm';
import { useState, useEffect } from "react";

const LandingPage = () => {
    const [ opaMin, setOpa ] = useState(0);
    const [ panSlide, setPanSlide ] = useState(0);
    const [ inSlide, setInslide ] = useState(0);

    const checkMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const scrollHandler = e => {
        if ( document.querySelector(".burger.-not-signed")?.classList.contains("-open") ) {
            return
        }

        const fortyScroll = window.innerHeight * .4;
        const scTop = e.target.scrollTop;

        if ( fortyScroll > scTop ) {
            setPanSlide(0)
            setOpa( ( scTop / fortyScroll ).toFixed(2) );
        } 

        if ( ( scTop >= window.innerHeight * .5 ) && ( scTop < ( window.innerHeight + fortyScroll - 50 ) ) ) {
            let newSlide = ( ( scTop - window.innerHeight * .5 ) / ( window.innerHeight + fortyScroll ) ).toFixed(2) - .01;

            newSlide = Math.sign(newSlide) === -1 ? 0 : newSlide * 100;

            setPanSlide( newSlide );
        }

        let inScrollComp = ( window.innerHeight + fortyScroll ) - 100;
        if ( scTop <= inScrollComp ) {

            let new_in = (scTop / inScrollComp) * 100;
            setInslide( new_in )
        } else {
            setInslide(100)
        }
    }

    useEffect( () => {
        const bod = document.querySelector("body");

        if ( !checkMobile() ) {
            bod.addEventListener("scroll", scrollHandler);
        }

        return () => !checkMobile() ? bod.removeEventListener("scroll", scrollHandler) : ""
    }, [])

    return (
        <>  
            <GeneralLand opaMin={opaMin}/>
            <LandPageForm panSlide={panSlide}/>
            <About inSlide={inSlide} />
            <FooterInfo/>
        </>
    )
}

export default LandingPage;