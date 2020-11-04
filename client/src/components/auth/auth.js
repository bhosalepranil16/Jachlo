import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

const Auth = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const login = async (e) => {
        try {
            e.preventDefault();
            await firebase.auth().signInWithEmailAndPassword(email, password);
            props.isLoginedHandler(true);
        }
        catch(err) {
            setIsError(err.message);
        }
    }

    return(
        <Container className="text-center bg-white my-5" >
            <h1 className="py-2" >Login</h1>
            <Form className="p-3" onSubmit={(e) => { login(e) }} >
                <Form.Group className="d-block mx-auto" >
                    <Form.Label><h4>Email</h4></Form.Label>
                    <Form.Control className="d-block mx-auto" value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" style={{width : 500 }} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label><h4>Password</h4></Form.Label>
                    <Form.Control className="d-block mx-auto" value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" style={{width : 500 }}   required />
                </Form.Group>
                <Form.Control className="btn btn-primary btn-lg  d-block mx-auto" type="submit" value="Login" style={{width : 200}}  />
            </Form>
            { isError ? <h3 className="p-2 text-danger " >{isError}</h3> : null }
        </Container>
    );
}

export default Auth;