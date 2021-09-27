import UserLists from "../../../wrappers/UserLists";

const Subordinate = ({users, isLoaded}) => {
    return(
        <>
            <p>Subordinates: Click the username to send a document</p>
            {isLoaded ? 
            <UserLists 
                users={users} 
                handler={()=>console.log("yip")}
                fromWhere={"profile"}
            />
            : <p>Loading users</p>}
        </>
    )
}

export default Subordinate;