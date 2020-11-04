import React from 'react';
import { Container, Row, Col ,Image } from 'react-bootstrap';

import  Logo from '../assets/logo.png';

const Welcome = (props) => {
    return(
        <Container className="bg-white text-center my-5 " >
            <Row className="align-items-center" >   
                <Col>
                    <Image src={Logo} className="d-block mx-auto" style={{width : 500, height : 500}} />
                </Col>
                <Col>
                    <h3>A decentralized supply chain management tracker app for pharmaceutical products. </h3>
                </Col>
            </Row>
        </Container>
    );
}

export default Welcome;