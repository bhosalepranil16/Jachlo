import React from 'react';
import { Table } from 'react-bootstrap';

import ScanRow from './scanRow';

const ScanTable = (props) => {
    return(
        <>
            <h3 className="text-center" >Product ID: {props.productId}</h3>
            <Table striped bordered hover variant="dark" className="text-center p-5">
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.values.map((v,i) => <ScanRow key={props.keys[i]}  v={v} />)
                    }
                </tbody>
            </Table>
        </>
    );
}

export default ScanTable;