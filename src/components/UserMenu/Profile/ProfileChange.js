import { useContext } from "react/cjs/react.development"
import { UserContext } from "../../../wrappers/DocumentsScannerEditor"

const ProfileChange = () => {
    const { id, username, mobile, role, email } = useContext(UserContext);

    const mobileHandler = e => {
        e.preventDefault();

        console.log("changing here!");
    }

    return (
        <>
            <p>{`User: ${username}`}</p>
            <p>{`Role: ${role}`}</p>
            <p>{`Email: ${email}`}</p>
            <p>
                {`Mobile Number: ${mobile}`}
                <button onClick={mobileHandler}>Change mobile number</button>
            </p>
        </>
    )
}

export default ProfileChange;