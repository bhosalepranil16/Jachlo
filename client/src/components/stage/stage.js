import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { decodeQRCode, captureImage } from '../ipfsClient';
import { appendStage, clearStages } from '../../store/actions';
import StageTable from './stageTable/stageTable';

const Scan = (props) => {

    const [qrCodeBuffer, setQRCodeBuffer] = useState('');
    const [displayTable, setDisplayTable] = useState(false);
    const [productId, setProductId] = useState('');

    const fetchAllStages = async (id) => {
        try {
            sendScanDetails(id);
            const cnt = await props.contract.methods.stageCount(id).call({ from: props.account });
            let stage;
            props.clearStages();
            for (let i = 0; i < cnt; i++) {
                stage = await props.contract.methods.stages(id, i).call({ from: props.account });
                props.appendStage(stage);
            }
            setProductId(id);
            setDisplayTable(true);
        }
        catch(err) {
            window.alert(err.message);
        } 
    }

    const sendScanDetails = async(id) => {
        try {
            navigator.geolocation.getCurrentPosition(async(result) => {
                const obj = {
                    account : props.account,
                    date : new Date().getTime(),
                    lat : result.coords.latitude,
                    lon : result.coords.longitude
                }
                await axios.post(`https://jachlo-3e151.firebaseio.com/scanDetails/productId-${id}.json`,obj);
            }) 
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return (
        <>
            <Container className="bg-white my-5 py-5 px-0">
                <h1 className="text-center ">Stage Details</h1>
                <Form onSubmit={(e) => { decodeQRCode(e, qrCodeBuffer, fetchAllStages) }} >
                    <Form.Group className="text-center">
                        <Form.Label ><h3>Enter Product's QR Code</h3></Form.Label>
                        <div>
                            <i className="fas fa-qrcode fa-3x d-block text-dark"></i>
                            <Form.Control type="file" onChange={(e) => { captureImage(e, setQRCodeBuffer) }} className="d-block mx-auto p-2" style={{width : 150}} />
                        </div> 
                        <Form.Control type="submit" className=" btn btn-primary d-block mx-auto p-2" style={{width : 300}} />
                    </Form.Group>
                </Form>
                { displayTable ? <StageTable productId={productId} /> : null }
            </Container>
        </>
    );
}

const mapStateToProps = state => {
    return {
        account: state.account,
        contract: state.contract
    }
}

const mapActionToProps = dispatch => {
    return {
        appendStage: (stage) => { dispatch(appendStage(stage)) },
        clearStages: () => { dispatch(clearStages()) }
    }
}

export default connect(mapStateToProps, mapActionToProps)(Scan);