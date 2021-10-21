import './FooterInfo.css'

const FooterInfo = ( { contactSlideClass } ) => {
    return (
        <footer>
            <div className="universal-container grid-contacts">
                <div className={`footer-bob ${contactSlideClass}`}>
                    <div className="footer-bob-header">
                        <h3>
                            CONTACT US
                        </h3>
                    </div>
                    <div className="footer-bob-body">
                        <p>

                        </p>
                    </div>
                </div>
                <div className={`fd footer-dev-ad ${contactSlideClass}`}>
                    <p>Source code https://github.com/KnackHops/documents-scanner-editor</p>
                    <p>Developed by KnackHops</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterInfo;