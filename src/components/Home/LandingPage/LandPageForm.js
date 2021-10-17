import { useState, useEffect, useContext } from "react";
import { userCheck } from "./UserCheck";
import { MenuContext } from "../../../wrappers/DocumentsScannerEditor";
import './LandPageForm.css';
import LoginRegisterInside from "./LoginRegisterInside";
import CodeVerify from "./CodeVerify";
import { 
    Switch, 
    Route, 
    useRouteMatch, 
    Redirect
} from "react-router";

const initialState = {
    fullname: "",
    username: '',
    password: '',
    email: '',
    mobile: ''
}

const codeInputInit = ""
const codeUserInit = {
    username: null,
    userid: null
}

const LandPageForm = ( { panSlide } ) => {
    const [ whichOpen, setWhichOpen ] = useState("login");
    const [ userInp, setUserInput ] = useState(initialState)
    const { logInHandle } = useContext(MenuContext);
    
    const openHandler = () => {
        if ( whichOpen === "verify-code" ) {
            setCodeUser( codeUserInit );
            setCodeInput( codeInputInit )
            setWhichOpen('login');
        } else {
            whichOpen === 'register' ? setWhichOpen('login') : setWhichOpen('register');
        }
    }

    const formHandler = e => {
        e.preventDefault();
        if ( whichOpen === "verify-code" ) {
            if ( codeInp ) {
                if ( codeInp.length < 4 ) {
                    window.alert("The code is 4 digits!");
                } else {
                    const user = {
                        userid: codeUser.userid,
                        code: codeInp
                    }
                    setCodeInput( codeInputInit );
                    verifyUser(user);
                }
            } else {
                window.alert("Code is empty!");
            }
        } else {
            let validityChk = userCheck(userInp, whichOpen);

            if ( validityChk ) {
                const user = userInp;
                setUserInput( initialState );
                
                whichOpen === 'login' ?
                loginUser({
                    username: user.username.toLowerCase(),
                    password: user.password
                }) 
                : registerUser({
                    fullname: user.fullname.toLowerCase(),
                    username: user.username.toLowerCase(),
                    password: user.password,
                    mobile: user.mobile,
                    email: user.email.toLowerCase()
                });
            }
        }
    }

    const [ codeUser, setCodeUser ] = useState( codeUserInit );

    const [ codeInp, setCodeInput ] = useState( codeInputInit );

    const verifyUser = _user => {
        fetch('http://127.0.0.1:5000/verify-user', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_user)
        })
        .then( resp => {
            if ( resp.ok ) {
                window.confirm("User Email Verified! Please ask for your account to be activated by an admin");
                openHandler(null);
            } else {
                window.alert("Error verifying Email! Please make sure you Entered the correct code")
            }
        })
    }

    const resendHandler = () => {
        const conf = window.confirm("Are you sure you want to resend the code?");

        if ( conf ) {
            const userid = codeUser.userid
            resendVerification(userid);
        } 
    }

    const resendVerification = userid => {
        fetch('http://127.0.0.1:5000/resend-verification', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid})
        })
        .then( resp => {
            if ( resp.ok ) {
                window.confirm("New code is sent! Please check your email");
            } else {
                window.alert("Error resending Email!");
            }
        })
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
        }).then( data => {
            if ( 'unverified' in data ) {
                window.alert("Please Verify your email first!");
                setWhichOpen("verify-code");
                setCodeUser( { username: data.username, userid: data.id } )
            }else{
                if ( data.activated ) {
                    logInHandle( data );
                } else {
                    window.alert("Your account is not yet activated");
                }
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
        })
        .then( resp => {
            if ( resp.ok ) {
                return resp.json();
            } else {
                throw Error('error registering');
            }
        })
        .then( data => {
            window.confirm("User registered!");
            setWhichOpen("verify-code");
            setCodeUser( { username: data.username, userid: data.id } )
        })
        .catch( err => window.alert(err) )
    }

    useEffect(()=>{
        setUserInput(initialState);
    }, [ whichOpen ])

    const inputHandler = (e, whichFrom) => {
        setUserInput({...userInp, [whichFrom]: e.target.value});
    }

    const match = useRouteMatch();

    return (
        <section className="land-page-section fd" >
            <form className={`land-page-form ${whichOpen}-container fd`} style={{transform: `translateX(${panSlide}rem)`}} onSubmit={formHandler}>
                {   whichOpen === "verify-code" ?
                    <Redirect to={`${match.url}/code-verification/${codeUser.username}`} /> :
                    <Redirect to={`${match.url}`} />
                }
                <Switch>
                    <Route path={`${match.url}/code-verification/`}>
                        { whichOpen === "verify-code" ? 
                            <CodeVerify 
                                username={codeUser.username}
                                formHandler={formHandler}
                                codeInp={codeInp}
                                resendHandler={resendHandler}
                                setCodeInput={setCodeInput}
                                openHandler={openHandler}
                            /> : 
                            <Redirect 
                                to={`${match.url}`}
                            /> }
                    </Route>
                    <Route exact path={`${match.url}`}>
                        <LoginRegisterInside 
                            whichOpen={whichOpen}
                            userInp={userInp}
                            inputHandler={inputHandler}
                            formHandler={formHandler}
                            openHandler={openHandler}
                        />
                    </Route>
                </Switch>
            </form>
        </section>
        
    )
}

export default LandPageForm;