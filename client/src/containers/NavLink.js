import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
    return(
        <NavLink exact activeStyle={{ color: '#FFF', textDecoration : 'underline' }}  className="px-2 " style={{color : '#CFCFCF'}} to={props.to} >{props.title}</NavLink>
    );
}

export default Link;