import './ScanPopUp.css';
import QrReader from 'react-qr-reader';
import { useContext, useEffect, useState, useRef } from 'react';
import { DocumentContext, MenuContext, UserContext } from '../../wrappers/DocumentsScannerEditor';

const ScanPopUp = () => {
    const [ qrLoaded, setQrLoaded ] = useState({isLoaded: false});
    const { id } = useContext(UserContext);
    const { popUpHandler } = useContext(MenuContext);
    const { setDocument } = useContext(DocumentContext);

    const qrFetch = qr_text => {
        fetch(`http://127.0.0.1:5000/document/fetch-doc-qr/?str_code=${qr_text}&userid=${id}`, {
            method: 'GET',
            mode: 'cors'
        }).then( resp => {
            if ( resp.ok ){
                if ( resp.status === 204 ) {
                    window.alert("not a document!");
                    return {document: null}
                } else {
                    return resp.json();
                }
            } else {
                window.alert("error fetching document!");
            }
        }).then( ( { document } ) => {
            if ( document ) {
                setDocument(document);
                popUpHandler();
            }
        })
    }

    useEffect(() => {
        if ( qrLoaded?.data ) {
            qrFetch(qrLoaded?.data);
        }
    }, [qrLoaded])

    const handleScan = data =>{
        if ( data ) {
            if ( data.slice(0, 4) === "doc/" && data.slice(10, 15) ==="/doc/" ) {
                window.confirm("Qr accepted!");
                setTimeout(() => {
                    setQrLoaded({
                        isLoaded: true,
                        data
                    })
                }, 200);
            }
        }
    }

    const handleError = err => {
        if( err.toString().includes("The request is not allowed by the user agent or the platform in the current context.") ) {
            setLegacy(true)
        }
    }

    const qrEl = useRef(null);

    const onDialogClicked = () => {
        qrEl.current.openImageDialog()
    }

    const [ isLegacy, setLegacy ] = useState(false);
    
    const checkOS = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            setLegacy(true)
        }
    }

    useEffect(() => {
        checkOS();
    }, [])

    return (
        <>
            <div className="scan-head fd">
                <h1>
                    Hello! Scanning!
                </h1>
                {
                    isLegacy ? 
                    <p>
                        <button onClick={onDialogClicked}>
                            Upload Image!
                        </button>
                    </p> : ""
                }
            </div>
            <QrReader 
                ref={qrEl}
                delay={100}
                onError={handleError}
                onScan={handleScan}
                legacyMode={isLegacy}
            />
        </>
    )
}

export default ScanPopUp;