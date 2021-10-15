import { io } from 'socket.io-client';

const getConnect = () => {
    return new Promise((resolve, reject) => {
        const socket = io('http://127.0.0.1:5000');

        socket.on("connect", () => {
            console.log("Is connected!: " + socket.connected)
            resolve(socket);
        })
        
        socket.on("reconnection_attemp", () => {
            console.log("is reconnecting please wait")
        })
        
        socket.on("disconnect", reason => {
            console.log("Disconnected!:" + reason)
        })

        socket.on("error", err => {
            if ( err ) {
                socket.disconnect();
                reject(err);
            }
        })
    })
}

export default getConnect;