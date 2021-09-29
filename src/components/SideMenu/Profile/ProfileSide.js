import { useContext } from "react/cjs/react.development";
import { SideContext } from "../../../wrappers/DocumentsScannerEditor";
import './ProfileSide.css';

const ProfileSide = () => {
    const { sideUser } = useContext(SideContext);
    return (
        <>
        <div className="side-head-container">
            <p>
            {sideUser.username}
            </p>
            <p>
                <button className="addBtn">
                    {sideUser.sideClass === 'profile-subordinate'?
                    "Remove as Subordinate" : "Add as Subordinate"}
                </button>
            </p>
        </div>
        <p>
            <button>Send a document</button>
        </p>
        {sideUser.sideClass === 'profile-subordinate' ? 
        <div>
            <p>
            {`mobile: ${sideUser.mobile}`}
            </p>
            <p>
            {`email: ${sideUser.email}`}
            </p>
        </div>:""}
        </>
    )
}

export default ProfileSide;