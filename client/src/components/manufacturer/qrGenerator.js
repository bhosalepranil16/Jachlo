import React, { useState } from 'react';
import QRCode from 'qrcode';
import { connect } from 'react-redux';

import { Form, Image, Container } from 'react-bootstrap';
import ipfs from '../ipfsClient';
import { captureImage } from '../ipfsClient';

const Generator = (props) => {
    const [productId, setProductId] = useState('');
    const [imgSrc,setImgSrc] = useState('');
    const [buffer, setBuffer] = useState('');
    const [imgDisplay, setImgDisplay] = useState('none');

    const createProduct = async(e) => {
        try {
            e.preventDefault();
            const hash = await ipfs.add(buffer);
            console.log(hash);
            let Stage = {};
            navigator.geolocation.getCurrentPosition(async (position) => {
                Stage = {
                    companyName : props.company,
                    manufacturer : "Manufacturer",
                    image : hash.path,
                    lat : position.coords.latitude.toString(),
                    lon : position.coords.longitude.toString()
                }
                const receipt = await props.contract.methods.createProduct(Stage.companyName, Stage.manufacturer, Stage.image, Stage.lat, Stage.lon)
                .send({ from : props.account })
                const product = receipt.events.CreateProduct.returnValues[0];
                setProductId(product.toString());
                const res = await QRCode.toDataURL(product, { version: 10 });
                setImgSrc(res);
                setImgDisplay('block');
            });
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return (
        <div>   
            <Container className="bg-white my-5">
                <h1 className="text-center p-2 " >Manufacturer</h1>
                <Form onSubmit={(e) => {createProduct(e)}} >
                    <Form.Group className="text-center p-2" >
                        <Form.Label>Add Product's Image</Form.Label>
                        <Form.Control type="file" className="d-block mx-auto p-2" onChange={(e) => { captureImage(e, setBuffer) }} style={{width : 150}} />
                        <Form.Control type="submit" className="btn btn-primary btn-lg d-block mx-auto" style={{width : 250}} />
                    </Form.Group>
                </Form>
                <div  style={{display : imgDisplay }}>
                    <a href={imgSrc} download={productId} >
                        <Image className="d-block mx-auto" src={imgSrc} style={{width: 200,height: 200}} />
                    </a>
                    <small className="form-text text-center">For downloading image, click on image.</small>
                </div>
            </Container>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        company : state.company,
        account : state.account,
        contract : state.contract,
        product : state.product
    }
}

export default connect(mapStateToProps)(Generator);
