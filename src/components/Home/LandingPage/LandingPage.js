import { useState, useEffect, useContext } from "react";
import "./LandingPage-style.css";
import { userCheck } from "./UserCheck";
import { MenuContext } from "../../../wrappers/DocumentsScannerEditor";

const initialState = {
        username: '',
        password: '',
        email: '',
        mobile: ''
}

const LandingPage = () => {
    const [whichOpen, setWhichOpen] = useState("login");
    const [userInp, setUserInput] = useState(initialState)
    const { logInHandle } = useContext(MenuContext);
    
    const openHandler = e => {
        e.preventDefault();
        whichOpen === 'register' ? setWhichOpen('login') : setWhichOpen('register');
    }

    const formHandler = e => {
        e.preventDefault();
        let validityChk = userCheck(userInp, whichOpen);

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

    const loginUser = _user => {
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_user)
        }).then(resp=>{
            if(resp.ok){
                return resp.json();
            }else{
                throw Error('error logging in');
            }
        }).then(data=>{
            if('id' in data){
                logInHandle(data);
            }else{
                window.alert('Your account is not yet activated!')
            }
        }).catch(err=>window.alert(err))
    }

    const registerUser = _user => {
        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_user)
        }).then(resp=>{
            if(resp.ok){
                window.confirm('User registered!');
            }else{
                throw Error('error registering');
            }
        }).catch(err=>window.alert(err))
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
                    <label 
                        htmlFor="username">
                            username
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={userInp.username} 
                        onChange={e=>inputHandler(e, 'username')}></input>
                </p>
                <p>
                    <label 
                        htmlFor="password">
                            password
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={userInp.password} 
                        onChange={e=>inputHandler(e, 'password')}></input>
                </p> 
                {
                    whichOpen === "register" ? <>
                    <p>
                        <label 
                            htmlFor="email">
                                email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={userInp.email} 
                            onChange={e=>inputHandler(e, 'email')}></input>
                    </p>
                    <p>
                        <label 
                            htmlFor="mobile">
                                mobile
                        </label>
                        <input 
                            type="tel" 
                            id="mobile" 
                            name="mobile" 
                            value={userInp.mobile} 
                            onChange={e=>inputHandler(e, 'mobile')}></input>
                    </p>
                    </> : ""
                }
                <p>
                    <button 
                        type="button" 
                        onClick={openHandler}>
                        {
                            whichOpen === "register" ? 
                            "Log In" : "Register"
                        }</button>
                    <button type="submit">Submit</button>
                </p>
            </form>
    )
}

export default LandingPage;