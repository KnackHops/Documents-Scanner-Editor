import { useState, useEffect } from "react";
import "./LandingPage-style.css";

const LandingPage = () => {
    const [whichOpen, setWhichOpen] = useState("register");

    const openHandler = e => {
        e.preventDefault();
        whichOpen === 'register' ? setWhichOpen('login') : setWhichOpen('register');
    }

    const formHandler = e => {
        e.preventDefault();
        console.log(whichOpen);
    }

    return (
        <form className={`${whichOpen}-container`} onSubmit={formHandler}>
                <p>
                    <label htmlFor="username">username</label>
                    <input type="text" id="username" name="username"></input>
                </p>
                <p>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password"></input>
                </p> 
                {
                    whichOpen === "register" ? <>
                    <p>
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" name="email"></input>
                    </p>
                    <p>
                        <label htmlFor="mobile">mobile</label>
                        <input type="tel" id="mobile" name="mobile"></input>
                    </p>
                    </> : ""
                }
                <p>
                    <button type="submit">Submit</button>
                    <button onClick={e=>openHandler(e)}>{
                        whichOpen === "register" ? 
                        "Log In" : "Register"
                    }</button>
                </p>
            </form>
    )
}

export default LandingPage;