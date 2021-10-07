const NavPanelList = ({arr, classCon}) => {
    return (
        <ul className={`fd nav-list ${classCon}-list-con`}>
            {arr.map((item, i)=>{
                return <li key={i}>
                            <button onClick={item.handler}>
                                {item.label}
                            </button>
                        </li>
            })}
        </ul>
    )
}

export default NavPanelList;