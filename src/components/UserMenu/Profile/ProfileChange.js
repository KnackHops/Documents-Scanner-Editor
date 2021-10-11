import { useContext } from "react/cjs/react.development"
import { MenuContext, UserContext } from "../../../wrappers/DocumentsScannerEditor"
import ProfilePopUp from "./ProfilePopUp";

const ProfileChange = () => {
    const { username, mobile, role, email } = useContext(UserContext);
    const { popUpHandler } = useContext(MenuContext);

    const emailHandler = e => {
        e.preventDefault();
        popUpHandler(true, "profile-change", <ProfilePopUp fromWhere={'email'}/>)
    }

    const mobileHandler = e => {
        e.preventDefault();
        popUpHandler(true, "profile-change", <ProfilePopUp fromWhere={'mobile'}/>)
    }

    return (
        <>
            <p>{`User: ${username}`}</p>
            <p>{`Role: ${role}`}</p>
            <p>
                <label htmlFor="email">Email: </label>
                <button onClick={emailHandler} id="email">{email}</button>
            </p>
            <p>
                <label htmlFor="mobile">Mobile: </label>
                <button onClick={mobileHandler} id="mobile">{mobile ? mobile : "None"}</button>
            </p>
        </>
    )
}

export default ProfileChange;