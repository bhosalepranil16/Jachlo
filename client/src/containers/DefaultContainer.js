import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import Stage from '../components/stage/stage';
import Auth from '../components/auth/auth';
import Welcome from '../components/Welcome';
import NavLink from './NavLink';

const DefaultContainer = (props) => {
    return(
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand style={{fontSize : 32}} href="/">Jachlo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"  >
                        <NavLink title="Home" to="/" />
                        <NavLink  title="Product Details" to="/stage" />
                        <NavLink  title="Login" to="/chain" />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/chain" >
                    <Auth isLoginedHandler={props.isLoginedHandler} />
                </Route>
                <Route path="/stage" >
                    <Stage />
                </Route>
                <Route path="/" >
                    <Welcome />
                </Route>
            </Switch>
        </>
    );
} 

export default DefaultContainer;