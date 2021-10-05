import { useContext } from "react";
import { MenuContext } from "./DocumentsScannerEditor";
import PanelBackGround from "./PanelBackGround";

const PopUpAside = ({children, fromWhere}) => {
    const {popUpHandler} = useContext(MenuContext);

    return (
        <PanelBackGround classCon="pop-up" handler={popUpHandler}>
            <aside className={`pop-up-container pop-${fromWhere}`}>
                {children}
            </aside>
        </PanelBackGround>
    )
}

export default PopUpAside;