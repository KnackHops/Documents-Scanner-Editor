import './QRSavedPopUp.css';

const QRSavedPopUp = ({qr_image, text="Saved! Here is the qr code!"}) => {
    return (
        <>
            <div>
                <h1>
                    {text}
                </h1>
            </div>
            <img src={qr_image}/>
        </>
    )
}

export default QRSavedPopUp;