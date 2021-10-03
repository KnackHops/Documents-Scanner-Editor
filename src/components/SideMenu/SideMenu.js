import { useContext, useEffect } from 'react/cjs/react.development';
import { DocumentContext, SideContext } from '../../wrappers/DocumentsScannerEditor';
import './SideMenu.css';

const SideMenu = ({classCon, children}) => {
    const { setSideUser } = useContext(SideContext);
    const { setSideDocuList, sideDocuList } = useContext(DocumentContext);

    useEffect(()=>{
        return ()=>{
            if(sideDocuList){
                setSideDocuList({documents: null})
            }
        }
    }, [])
    return (
        <aside className={`side-menu ${classCon}`}>
            {children}
            <p>
                <button onClick={()=>setSideUser(null)}>Close Panel</button>
            </p>
        </aside>
    )
}

export default SideMenu;