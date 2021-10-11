import './GeneralLand.css'

const GeneralLand = ({opaMin}) => {

    return (
        <section className="general-land" style={ { opacity: (1 - opaMin) } }>
            <h1>
                General Here
            </h1>
        </section>
    )
}

export default GeneralLand;