// import { useEffect } from "react/cjs/react.development";
import './ScanPopUp.css';
import QrReader from 'react-qr-scanner';
import { useState } from 'react';
// import { MultiFormatReader, BarcodeFormat, DecodeHintType, BinaryBitmap, HybridBinarizer, RGBLuminanceSource } from "@zxing/library";
// import { useMemo, useState } from "react";

const ScanPopUp = () => {
    // const reader = useMemo(()=>{
    //     const hints = new Map();

    //     hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE])

    //     const reader = new MultiFormatReader();

    //     reader.setHints(hints);

    //     return reader;
    // }, [])
    
    // const hasUserMedia = () => {
    //     return !!(navigator?.mediaDevices?.getUserMedia);
    // }
    // const [videoLoaded, setVideo] = useState(false);
    // const setUpMedia = async () => {
    //     const vid = document.querySelector("#video-media");
        
    //     if ( hasUserMedia() ) {
    //         if ( vid ) {
    //             let stream = await navigator.mediaDevices.getUserMedia({
    //                 video: true,
    //                 audio: false,
    //             })
    
    //             vid.srcObject = stream
    //             setVideo(true);
    //         }
    //     }
    // }

    // useEffect( () => {
    //     setUpMedia();
    // }, [])

    // useEffect( () => {
    //     if ( videoLoaded ) {
    //         const can = document.querySelector("#canvas-media");
    //         const ctx = can.getContext('2d');
    //         const vid = document.querySelector("#video-media");

    //         const intCan = setInterval( () => {
    //             if( can && vid ) {
    //                 if ( vid.srcObject ) {
                    
    //                     can.width = 200;
    //                     can.height = 400;
    //                     ctx.drawImage(vid, 0, 0, can.width, can.height);
    //                     /* there might be conflict of data here */
    //                     const imgData = ctx.getImageData(0, 0, can.width, can.height);
    //                     const lumiSrc = new RGBLuminanceSource(imgData.data, can.width, can.height);
    //                     const binBitmap = new BinaryBitmap(new HybridBinarizer(lumiSrc));

    //                     try {
    //                         let result = reader.decode(binBitmap);
    //                         clearInterval(intCan);
    //                         console.log(result)
    //                     } catch {
    //                         console.log("none yet")
    //                     }
    //                 }
    //             }
    //         }, 1000 / 15);

    //         return ()=> {
    //             clearInterval(intCan);
    //             vid.srcObject = null
    //             ctx.clearRect(0, 0, can.width, can.height);
    //         }
    //     }
    // }, [videoLoaded])

    // const captureQR = () => {
    //     do {
    //         if( can && vid ) {
    //             if ( vid.srcObject ) {
    //             can.width = vid.videoWidth;
    //             can.height = vid.videoHeight;
    
    //             can.getContext('2d').drawImage(vid, 0, 0, can.width, can.height);
    //             }
    //         }
    //     } while (true);
    // }
    const [ qrLoaded, setQrLoaded ] = useState({isLoaded: false});

    return (
        <>
            <div className="scan-head fd">
                <h1>
                    Hello! Scanning!
                </h1>
                {/* <p>
                    <button onClick={captureQR}>
                        Capture
                    </button>
                </p> */}
            </div>
            {   qrLoaded.isLoaded ? "" : 
                <QrReader 
                    delay={100}
                    onError={()=>{
                        console.log("err");
                    }}
                    onScan={(data)=>{
                        if ( data ) {
                            setQrLoaded({
                                isLoaded: true,
                                data
                            })
                        }
                    }}
                />
            }
            {/* <div id="media-container">
                <video id="video-media" autoPlay muted />
                <canvas id="canvas-media" />
            </div> */}
        </>
    )
}

export default ScanPopUp;