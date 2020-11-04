import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Receipt = (props) => {
    return(
        <Card className="mb-5" >
            <Card.Body  className="text-center">
                <Button variant="primary" className="float-right" onClick={(e) => {props.removeReciept(false)}}><i className="far fa-times-circle"></i></Button>
                <Card.Title>Receipt</Card.Title>
                <Card.Text>Product ID : { props.productId }</Card.Text>
                <Card.Text>From : { props.from }</Card.Text>
                <Card.Text>To : { props.to }</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Receipt;