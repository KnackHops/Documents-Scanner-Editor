import { useEffect } from "react/cjs/react.development"

const PanelBackGround = ({classCon, handler, children}) => {

    const bgClicked = e => {
        if(e.target.classList.contains(`universal-bg`)){
            handler();
        }
    }

    useEffect(()=>{
        const bg = document.querySelector('.universal-bg');

        if(bg){
            bg.addEventListener("click", bgClicked)
        }
        return () => {
            if(bg){
                bg.removeEventListener("click", bgClicked)
            }
        }
    },[handler])

    return (
        <div className={`universal-bg ${classCon}-bg fd`}>
            {children}
        </div>
    )
}

export default PanelBackGround;