import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

import Supplychain from '../components/supplyChain/supplyChain';
import Check from '../components/scan/scan';
import Stage from '../components/stage/stage';
import Manufacture from '../components/manufacturer/qrGenerator';
import Header from '../components/header/header';
import NavLink from './NavLink'

const AuthContainer = (props) => {
    return(
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand style={{fontSize : 32}} href="/">Jachlo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink title="Product Details" to="/" />
                        <NavLink title="Add Products" to="/manufacture" />
                        <NavLink title="Send Further" to="/supplychain" />
                        <NavLink title="Scan Details" to="/check" />
                    </Nav>
                    <Button onClick={() => { props.isLoginedHandler(false) }} >Logout</Button>
                </Navbar.Collapse>
            </Navbar>
            <Header />
            <Switch>
                <Route path="/manufacture" >
                    <Manufacture />
                </Route>
                <Route path="/supplychain" >
                    <Supplychain />
                </Route>
                <Route path="/check" >
                    <Check />
                </Route>
                <Route path="/" >
                    <Stage />
                </Route>
            </Switch> 
        </>
    );
}

export default AuthContainer;