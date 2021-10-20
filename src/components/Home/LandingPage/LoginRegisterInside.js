const LoginRegisterInside = ( { whichOpen, userInp, inputHandler, formHandler, openHandler } ) => {
    return (
        <>
            <p>
                <label
                    htmlFor="username">
                        username
                </label>
                <input
                    minLength="5"
                    maxLength="15"
                    type="text" 
                    id="username" 
                    name="username" 
                    value={userInp.username} 
                    onChange={e=>inputHandler(e, 'username')}>
                 </input>
            </p>
            <p>
                <label 
                    htmlFor="password">
                        password
                </label>
                <input 
                    minLength="5"
                    type="password" 
                    id="password" 
                    name="password" 
                    value={userInp.password} 
                    onChange={e=>inputHandler(e, 'password')}>
                </input>
            </p> 
            {   whichOpen === "register" ? <>
            <p>
                <label
                    htmlFor="fullname">
                        fullname
                </label>
                <input
                    type="text"
                    id="username"
                    name="fullname"
                    value={userInp.fullname}
                    onChange={e=>inputHandler(e, 'fullname')}>
                </input>
            </p>
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
                    onChange={e=>inputHandler(e, 'email')}>
                </input>
            </p>
            <p>
                <label 
                    htmlFor="mobile">
                        mobile
                </label>
                <input 
                    minLength="11"
                    maxLength="13"
                    type="tel" 
                    id="mobile" 
                    name="mobile" 
                    value={userInp.mobile} 
                    onChange={e=>inputHandler(e, 'mobile')}>
                </input>
            </p>
            </> : ""    }
            <p>
                <button 
                    type="button" 
                    onClick={openHandler}>
                    {   whichOpen === "register" ? 
                        "Log In" : "Register"
                    }
                </button>
                <button type="submit" onClick={formHandler}>
                    Submit
                </button>
            </p>
        </>
    )
}

export default LoginRegisterInside;