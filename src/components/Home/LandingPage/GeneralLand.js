import './GeneralLand.css'

const GeneralLand = ( { opaMin, generalSlideClass } ) => {

    return (
        <section className={`general-land ${generalSlideClass}`}>
            <div className="box-container" style={ { opacity: (1 - opaMin) } }>
                <div className="box-inside-1 fd">
                    <p>
                    </p>
                </div>
                <div className="box-inside-2 fd">
                    <p>
                    </p>
                </div>
                <div className="box-inside-3 fd">
                    <p>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default GeneralLand;