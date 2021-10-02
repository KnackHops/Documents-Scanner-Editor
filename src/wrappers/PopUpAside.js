const PopUpAside = ({children, fromWhere}) => {
    return (
        <div className={`pop-up-bg fd`}>
            <aside className={`pop-up-container pop-${fromWhere}`}>
                {children}
            </aside>
        </div>
    )
}

export default PopUpAside;