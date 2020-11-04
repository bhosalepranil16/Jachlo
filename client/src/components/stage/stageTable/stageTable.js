import React from 'react';
import { Table } from 'react-bootstrap';
import {connect} from 'react-redux';

import StageRow from './stageRow';

const StageTable = (props) => {
    return(
        <>
            <h3 className="text-center" >Product ID: {props.productId}</h3>
            <Table striped bordered hover responsive variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Image</th>
                        <th>Time</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.productStages.map(stage => (<StageRow key={stage.recordedAt} stage={stage}/>))
                    }
                </tbody>
            </Table>
        </>
    );
}

const mapStateToProps = state => {
    return {
        productStages : state.productStages
    }
}

export default connect(mapStateToProps)(StageTable);