import './AboutInfo.css';

const About = ({inSlide}) => {
    return (
        <section className="about-info">
            <div className="universal-container">
                <div className="about-container" style={{left: `calc(-100% + ${inSlide}%)`}}>
                    <div>
                        <h1>
                            About
                        </h1>        
                    </div>
                    <div>
                    
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;