import ipfsClient from 'ipfs-http-client';
import QrCode from 'qrcode-reader';
import Jimp from 'jimp';

export const captureImage = (e, callback) => {
    try {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            callback(Buffer.from(reader.result));
        }
    }
    catch(err) {
        window.alert(err.message);
    }
}

export const decodeQRCode = async (e, qrCodeBuffer, callback) => {
    try {
        e.preventDefault();
        const qr = new QrCode();
        qr.callback = function (er, value) {
            if (er) {
                window.alert(er.message);
            }
            callback(parseInt(value.result));
        };
        const image = await Jimp.read(qrCodeBuffer);
        qr.decode(image.bitmap);
    }
    catch (err) {
        window.alert(err.message);
    }
}

export default ipfsClient({
    host : 'ipfs.infura.io',
    port : 5001,
    protocol : 'https'
});