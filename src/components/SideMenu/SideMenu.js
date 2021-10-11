import { useCallback, useContext } from 'react';
import { SideContext } from '../../wrappers/DocumentsScannerEditor';
import PanelBackGround from '../../wrappers/PanelBackGround';
import './SideMenu.css';

const SideMenu = ({classCon, children}) => {
    const { setSideUser, isAttached } = useContext(SideContext);

    const SideMain = useCallback(()=>{
        return (
            <aside className={`side-menu ${classCon}`}>
                {children}
                <p>
                    <button onClick={()=>setSideUser(null)}>Close Panel</button>
                </p>
            </aside>
        )
    }, [children])

    return (
        <>
            {!isAttached ?   
                <PanelBackGround classCon="side-menu-not-att" handler={()=>""}>
                    <SideMain />
                </PanelBackGround> : 
                    <SideMain />}
            
        </>
    )
}

export default SideMenu;