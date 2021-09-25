const SideMenu = ({classCon, children}) => {
    return (
        <aside className={`sideMenu ${classCon}`}>
            {children}
        </aside>
    )
}

export default SideMenu;