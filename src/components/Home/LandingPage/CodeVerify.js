const CodeVerify = ( { username, formHandler, codeInp, resendHandler, setCodeInput, openHandler } ) => {
    return (
        <>
            <p>
                Hello! {username}
            </p>
            <p>
                <label htmlFor="code">Please input the code sent to your email here!: </label>
                <input 
                    maxLength="4"
                    name="code" 
                    id="code" 
                    value={codeInp.value} 
                    onChange={e=>setCodeInput(e.target.value)}></input>
            </p>
            <p>
                <button
                    type="button"
                    onClick={resendHandler}>
                        Resend
                </button>
                <button
                    type="button"
                    onClick={openHandler}>
                        Back
                </button>
                <button
                    type="submit"
                    onClick={formHandler}>
                        Submit
                </button>
            </p>
        </>
    )
}

export default CodeVerify;