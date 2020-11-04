import React from 'react';

const scanRow = (props) => {

    const date = new Date(parseInt(props.v.date)).toString();
    const modifiedDate = date.slice(0, date.indexOf("GMT") - 1);

    return (
        <tr>
            <td>{props.v.account}</td>
            <td>{modifiedDate}</td>
            <td>
                <a style={{color : 'white'}} href={`https://www.google.com/maps?q=${props.v.lat},${props.v.lon}`} target="_blank" >Location</a>
            </td>
        </tr>
    );
}

export default scanRow;