import { useContext } from "react/cjs/react.development";
import { SideContext, UserContext } from "../../../wrappers/DocumentsScannerEditor";
import './ProfileSide.css';

const ProfileSide = () => {
    const { sideUser, setSideUser } = useContext(SideContext);
    const { id, fetchUsers } = useContext(UserContext);

    const profileSubordinateHandler = e => {
        const whichFrom = e.target.getAttribute('data-sub');

        if(whichFrom === 'subordinate'){
            fetch(`http://127.0.0.1:5000/remove-subordinate/?id=${id}&userid=${sideUser.id}`, {
                method: 'DELETE',
                mode: 'cors'
            }).then(resp=>{
                if(resp.ok){
                    fetchUsers(true);
                    setSideUser(null);
                }else{
                    console.log("error removing subordinate");
                }
            })
        }else{
            fetch(`http://127.0.0.1:5000/add-subordinate`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    userid: sideUser.id
                })
            }).then(resp=>{
                if(resp.ok){
                    fetchUsers(true);
                    setSideUser(null);
                }else{
                    console.log("error adding subordinate");
                }
            })
        }
    }

    return (
        <>
        <div className="side-head-container">
            <p>
            {sideUser.username}
            </p>
            <p>
                <button className="addBtn" 
                data-sub={sideUser.sideClass === 'profile-subordinate' ? 'subordinate' : 'stranger'}
                onClick={profileSubordinateHandler}
                >
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