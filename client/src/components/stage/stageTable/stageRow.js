import React from 'react';
import { Image } from 'react-bootstrap';

const stageRow = (props) => {

    const date = new Date(parseInt(props.stage.recordedAt)*1000).toString();
    const modifiedDate = date.slice(0, date.indexOf("GMT") - 1);
    return (
        <tr>
            <td>{props.stage.name}</td>
            <td>{props.stage.participant}</td>
            <td>
                <Image src={`https://ipfs.infura.io/ipfs/${props.stage.image}`} fluid style={{width : 100, height : 100}} />
            </td>
            <td>{modifiedDate} </td>
            <td>
                <a style={{color : 'white'}} href={`https://www.google.com/maps?q=${props.stage.lat},${props.stage.lon}`} target="_blank" >Location</a>
            </td>
        </tr>
    );
}

export default stageRow;
