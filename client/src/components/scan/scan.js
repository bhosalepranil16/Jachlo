import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';

import ScanTable from './scanTable/scanTable';
import { captureImage, decodeQRCode } from '../ipfsClient';

const Scan = (props) => {

    const [keys,setKeys] = useState(null);
    const [values, setValues] = useState(null);
    const [qrCodeBuffer, setQRCodeBuffer] = useState(null);
    const [displayTable, setDisplayTable] = useState(false);
    const [productId, setProductId] = useState('');

    const getData = async (id) => {
        const data = await axios.get(`https://jachlo-3e151.firebaseio.com/scanDetails/productId-${id}.json`);
        setKeys(Object.keys(data.data));
        setValues(Object.values(data.data));
        setProductId(id);
        setDisplayTable(true);
    }

    return(
        <Container className="bg-white my-5 py-5 px-0" >
            <h1 className="text-center ">Scan Details</h1>
            <Form onSubmit={(e) => { decodeQRCode(e, qrCodeBuffer, getData) }} >
                <Form.Group className="text-center">
                    <Form.Label className="d-block" ><h3>Enter Product's QR Code</h3></Form.Label>
                    <i className="fas fa-qrcode fa-3x d-block text-dark"></i>
                    <Form.Control type="file" onChange={(e) => { captureImage(e, setQRCodeBuffer) }} className="d-block mx-auto p-2" style={{width : 150}} />
                    <Form.Control type="submit" className=" btn btn-primary d-block mx-auto p-2" style={{width : 300}} />
                </Form.Group>
            </Form>
            { displayTable ? <ScanTable keys={keys} values={values} productId={productId} /> : null }
        </Container>
    );
}

export default Scan;