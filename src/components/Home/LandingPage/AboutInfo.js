import './AboutInfo.css';

const About = ( { aboutSlideClass } ) => {
    return (
        <section className="about-info">
            <div className="universal-container">
                <div className={`about-container ${aboutSlideClass}`}>
                    <div className="about-bob-header">
                        <h1>
                            About
                        </h1>        
                    </div>
                    <div className="about-bob-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;