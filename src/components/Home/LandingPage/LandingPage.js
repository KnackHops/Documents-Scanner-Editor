import About from "./AboutInfo";
import FooterInfo from "./FooterInfo";
import GeneralLand from "./GeneralLand";
import "./LandingPage-style.css";
import LandPageForm from './LandPageForm';
import { useState, useEffect, useContext } from "react";
import { MenuContext } from "../../../wrappers/DocumentsScannerEditor";

const LandingPage = () => {
    const { getMainChildrenHeights } = useContext(MenuContext);
    const [ opaMin, setOpa ] = useState(0);
    const [ generalSlideClass, setGeneralSlideClass ] = useState("panel-slide-deactivate");
    const [ loginSlideClass, setLoginSlideClass ] = useState("panel-slide-deactivate");
    const [ aboutSlideClass, setAboutSlideClass ] = useState("panel-slide-deactivate");
    const [ contactSlideClass, setContactSlideClass ] = useState("panel-slide-deactivate");

    const checkMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const scrollHandler = e => {
        if ( document.querySelector(".burger.-not-signed")?.classList.contains("-open") ) {
            return
        }
        const [ firstCompo, secondCompo, thirdCompo ] = getMainChildrenHeights();

        const scTop = e.target.scrollTop;

        if ( scTop >  firstCompo * .65 ) {
            setGeneralSlideClass("panel-slide-activate");
        } else {
            setGeneralSlideClass("panel-side-deactivate");
        }

        if ( firstCompo > scTop ) {
            setOpa( ( scTop / ( firstCompo * .8 ) ).toFixed(2) );
        }

        if ( scTop >= firstCompo * .5 && scTop <= secondCompo * .8 ) {

            setLoginSlideClass("panel-slide-activate");
        } else {

            setLoginSlideClass("panel-slide-deactivate");
        }

        if ( scTop >= secondCompo * .7 && scTop <= thirdCompo * .8 ) {
            setAboutSlideClass("panel-slide-activate")
        } else {
            setAboutSlideClass("panel-slide-deactivate")
        }

        if ( scTop >= thirdCompo *.8 ) {
            setContactSlideClass("panel-slide-activate");
        } else {
            setContactSlideClass("panel-slide-deactivate")
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
            <GeneralLand opaMin={opaMin} generalSlideClass={generalSlideClass}/>
            <LandPageForm loginSlideClass={loginSlideClass}/>
            <About aboutSlideClass={aboutSlideClass} />
            <FooterInfo contactSlideClass={contactSlideClass}/>
        </>
    )
}

export default LandingPage;