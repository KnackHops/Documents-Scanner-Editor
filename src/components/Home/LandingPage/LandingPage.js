import { useState, useEffect } from "react";
import "./LandingPage-style.css";

const initialState = {
        username: '',
        password: '',
        email: '',
        mobile: ''
}

const LandingPage = ({loginUser, registerUser}) => {
    const [whichOpen, setWhichOpen] = useState("login");
    const [userInp, setUserInput] = useState(initialState)

    const openHandler = e => {
        e.preventDefault();
        whichOpen === 'register' ? setWhichOpen('login') : setWhichOpen('register');
    }

    const mobileCheck = () => {
        let mobilechk = true;
        let error = 'Mobile Number has invalid characters!';

        if(userInp.mobile.length >= 11 && userInp.mobile.length <= 13){
            if(!isNaN(userInp.mobile)){
                if(userInp.mobile.includes('E') || userInp.mobile.includes('e')){
                    mobilechk = false;
                }else{
                    if(userInp.mobile.slice(0,2) === '09' || userInp.mobile.slice(0,3) === '639'){
                        if(userInp.mobile.slice(0,2) === '09' && userInp.mobile.length !== 11){
                            mobilechk = false;
                        }
                        if(userInp.mobile.slice(0,3) === '639' && userInp.mobile.length !== 13){
                            mobilechk = false;
                        }
                        if(mobilechk){
                            error = 'Mobile number must be valid';
                        }
                    }else{
                        mobilechk = false;
                        error = 'Mobile number must start with 09 and 639'
                    }
                }
            }else{
                mobilechk = false;
            }
        }else{
            mobilechk = false;
            error = 'Mobile number must be 11 to 13 long'
        }

        return [mobilechk, error];
    }

    const passCheck = () => {
        let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let passchk = false;
        let error = '';
        let upper = 0, lower = 0;

        if(userInp.password.length < 5){
            error = 'Password needs to be 5 characters or more'
        }else{
            if(whichOpen === 'register'){
                if(format.test(userInp.password)){
                    [...userInp.password].forEach(lett=>{
                        if(lett.toLowerCase() !== lett.toUpperCase()){
                            if(lett.toUpperCase() === lett){
                                upper+=1;
                            }
                            if(lett.toLowerCase() === lett){
                                lower+=1;
                            }
                        }
                    })
    
                    if(upper === 0){
                        error = 'Password needs to have at least one uppercase character';
                    }else if(lower === 0){
                        error = 'Password needs to have at least one lowercase character';
                    }else{
                        passchk = true;
                    }
                }else{
                    error = 'Password needs to have at least one special character';
                }
            }else{
                passchk = true;
            }
        }

        return[passchk, error];
    }

    const userCheck = () => {
        let returnVar = true;

        if(userInp.username){
            if(userInp.password){
                if(whichOpen === 'register'){
                    if(!userInp.mobile){
                        window.alert('Mobile Number is empty!');
                        returnVar = false;
                    }
                    if(!userInp.email){
                        window.alert('Email is empty!');
                        returnVar = false;
                    }
                    if(!/^\S+@\S+\.\S+$/.test(userInp.email)){
                        window.alert('Please provide a proper email');
                        returnVar = false;
                    }
                }
                if(returnVar){
                    if(userInp.length < 5){
                        window.alert('Username needs to be 5 characters or longer');
                        returnVar = false;
                    }else{
                        const [passchk, pass_error] = passCheck();
                        const [mobilechk, mobile_error] = mobileCheck();

                        if(passchk){
                            if(!mobilechk && whichOpen === 'register'){
                                window.alert(mobile_error);
                                returnVar = mobilechk;
                            }
                        }else{
                            window.alert(pass_error);
                            returnVar = passchk;
                        }
                    }
                }
            }else{
                window.alert(`Password is empty!`);
                returnVar = false;
            }
        }else{
            window.alert(`Username is empty!`);
            returnVar = false;
        }

        return returnVar;
    }

    const formHandler = e => {
        e.preventDefault();
        let validityChk = userCheck();

        if(validityChk){
            const user = userInp;
            setUserInput(initialState);
            
            whichOpen === 'login' ?
            loginUser({
                username: user.username,
                password: user.password
            }) 
            : registerUser({
                username: user.username,
                password: user.password,
                mobile: user.mobile,
                email: user.email
            });
        }
    }

    useEffect(()=>{
        setUserInput(initialState);
    }, [whichOpen])

    const inputHandler = (e, whichFrom) => {
        setUserInput({...userInp, [whichFrom]: e.target.value});
    }

    return (
        <form className={`${whichOpen}-container`} onSubmit={formHandler}>
                <p>
                    <label htmlFor="username">username</label>
                    <input type="text" id="username" name="username" value={userInp.username} onChange={e=>inputHandler(e, 'username')}></input>
                </p>
                <p>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" value={userInp.password} onChange={e=>inputHandler(e, 'password')}></input>
                </p> 
                {
                    whichOpen === "register" ? <>
                    <p>
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" name="email" value={userInp.email} onChange={e=>inputHandler(e, 'email')}></input>
                    </p>
                    <p>
                        <label htmlFor="mobile">mobile</label>
                        <input type="tel" id="mobile" name="mobile" value={userInp.mobile} onChange={e=>inputHandler(e, 'mobile')}></input>
                    </p>
                    </> : ""
                }
                <p>
                    <button type="button" onClick={openHandler}>{
                        whichOpen === "register" ? 
                        "Log In" : "Register"
                    }</button>
                    <button type="submit">Submit</button>
                </p>
            </form>
    )
}

export default LandingPage;