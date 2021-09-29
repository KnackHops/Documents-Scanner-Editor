import { useContext } from 'react/cjs/react.development';
import { SideContext } from '../../wrappers/DocumentsScannerEditor';
import './SideMenu.css';

const SideMenu = ({classCon, children}) => {
    const { setSideUser } = useContext(SideContext);
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