import React from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
    return(
        <div className="bg-secondary text-white m-2 " >
            <h1 className="text-center p-2" >{props.company}</h1>
            <h2 className="text-center p-2" >{props.product}</h2>
        </div> 
    );
}

const mapStateToProps = state => {
    return {
        company : state.company,
        product : state.product
    }
}

export default connect(mapStateToProps)(Header);