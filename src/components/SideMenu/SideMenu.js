import './SideMenu.css';

const SideMenu = ({classCon, children}) => {
    return (
        <aside className={`side-menu ${classCon}`}>
            {children}
        </aside>
    )
}

export default SideMenu;