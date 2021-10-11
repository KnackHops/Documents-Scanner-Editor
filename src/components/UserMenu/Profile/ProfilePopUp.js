import { useState, useContext } from 'react';
import { MenuContext, UserContext } from '../../../wrappers/DocumentsScannerEditor';
import { emailCheck, mobileCheck } from './../../Home/LandingPage/UserCheck';
import './ProfilePopUp.css'

const ProfilePopUp = ({fromWhere}) => {
    const labelTxt = fromWhere.charAt(0).toUpperCase() + fromWhere.slice(1);
    const { id, mobile, email, updateUser } = useContext(UserContext);
    const { popUpHandler } = useContext(MenuContext);

    const [ inputVal, setInputVal ] = useState("");

    const formHandler = e => {
        e.preventDefault();

        let chk;
        let errText;

        if ( fromWhere === 'mobile' ) {
            if ( mobile === inputVal ) {
                window.alert("No change detected!");
                return
            } else {
                [chk, errText] = mobileCheck(inputVal);
            }
        } else {
            if ( email === inputVal ) {
                window.alert("No change detected!");
                return
            } else {
                chk = emailCheck(inputVal);
                errText = "Email not valid!"
            }
        }


        if ( chk ) {
            fetch(`http://127.0.0.1:5000/update-user`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: id,
                    val: inputVal.toLowerCase(),
                    which: fromWhere
                })
            }).then(resp=>{
                if ( resp.ok ) {
                    updateUser(fromWhere, inputVal);
                    window.confirm("User updated!");
                    popUpHandler();
                } else {
                    window.alert("Updating User Error!")
                }
            })
        } else {
            window.alert(errText);
        }
    }

    return (
        <>
            <div>
                <h1>
                    profile header
             </h1>
            </div>
            <form onSubmit={formHandler} className="fd">
                <p className="fd">
                    <label htmlFor={fromWhere}>{labelTxt}</label>
                    <input 
                        id={{fromWhere}}
                        type={fromWhere === "mobile" ? "tel" : "email"}
                        value={inputVal}
                        onChange={e=>setInputVal(e.target.value)}
                        >
                    </input>
                </p>
                <p>
                    <button type="submit">
                        Submit
                    </button>
                </p>
            </form>
        </>
    )
}

export default ProfilePopUp;