import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Container } from 'react-bootstrap';

import Receipt from './receipt';
import ipfs, { captureImage, decodeQRCode } from '../ipfsClient';

const SupplyChain = (props) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [productBuffer, setProductBuffer] = useState(null);
    const [productId, setProductId] = useState('');
    const [disableSend, setDisableSend] = useState(true);
    const [returnValues, setReturnValues] = useState({to : null, from : null, productId : null});
    const [receiptDisplay, setReceiptDisplay] = useState(false);

    const send = async(e) => {
        try {
            e.preventDefault();
            
            const hash = await ipfs.add(productBuffer);
            
            navigator.geolocation.getCurrentPosition(async(position) =>{
                const receipt = await props.contract.methods.send(parseInt(productId), name, role, hash.path,position.coords.latitude.toString(),position.coords.longitude.toString(),address)
                .send({ from : props.account });
                const r = receipt.events.Sent.returnValues;
                const receiptObject = {
                    from : r._from,
                    to : r._to,
                    productId : r._productId
                }
                setReturnValues(receiptObject);
                setReceiptDisplay(true);
            });
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    const decodeQR = async (data) => {
        await decodeQRCode(document.createEvent('MouseEvent'),data,setProductId);
        setDisableSend(false);
    }

    return(
        <Container className="bg-light my-5" >
            <Form className="p-4" onSubmit={(e) => {send(e)}}>
                <h3 className="text-center">Send</h3>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => {setName(e.target.value);}} placeholder="Enter Name: " required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" value={role} onChange={(e) => {setRole(e.target.value);}}>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Distribution Centers and Warehouses">Distribution Centers and Warehouses</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Retailer">Retailer</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Hospital">Hospital</option>
                    </Form.Control>
                </Form.Group>   
                <Form.Group>
                    <Form.Label>Add Product's Image</Form.Label>
                    <Form.Control type="file" onInput={(e) => { captureImage(e, setProductBuffer); }} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Add Product's QR Code</Form.Label>
                    <Form.Control type="file" onInput={(e) => { captureImage(e,decodeQR); } } required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Address</Form.Label>
                    <Form.Control type="text" value={address} onChange={(e) => {setAddress(e.target.value);}} placeholder="Enter Address: " required/>
                </Form.Group>
                <Form.Control type="submit" className="btn btn-primary d-block mx-auto " value="Send" style={{width : 150}}  disabled={disableSend} />
            </Form>
            {receiptDisplay ? <Receipt from={returnValues.from} to={returnValues.to} productId={returnValues.productId} removeReciept={setReceiptDisplay}/> : null}
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        contract : state.contract,
        account : state.account
    }
}

export default connect(mapStateToProps)(SupplyChain);