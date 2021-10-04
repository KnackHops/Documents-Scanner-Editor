import { useContext } from "react/cjs/react.development";
import { SideContext } from "../../../wrappers/DocumentsScannerEditor";
import UserMenu from "../../UserMenu/UserMenu";

const AsideHome = () => {
    const {sideUser} = useContext(SideContext);
    return (
        <>
            {sideUser ? <div className="side-user-bg"></div>: ""}
            <UserMenu />
        </>
    )
}

export default AsideHome;