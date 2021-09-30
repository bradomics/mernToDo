import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { AuthContext } from "../App";
import { Container, Row, FormControl, Form, Button } from "react-bootstrap";
import NavBar from '../components/NavBar';


export default function Home() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [auth, setAuth] = useContext(AuthContext);
    const logout = () => {
        setAuth(null);
    };

    const handleErrors = async (response) => {
        if (!response.ok) {
          const { message } = await response.json();
          throw Error(message);
        }
        return response.json();
      };

    const signUp = (e) => {
        e.preventDefault();
        fetch(`http://localhost:9000/signUp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            password,
          }),
        })
        .then(handleErrors)
        .then(() => {
            setAuth({
                email,
                name,
                password,
            });
            history.push("/dashboard");
        })
        .catch((error) => {
            setError(error.message);
        });
    };

  const history = useHistory();

  return (
    <div>
        <NavBar/>
        <Container>
            <Row>
                <div className="col-sm-6 mx-auto">
                    <h2 className="mt-5">Sign Up</h2>
                    <Form onSubmit={signUp}>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label className="float-start">Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email:" />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label className="float-start">Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name:" />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label className="float-start">Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password:" />
                        </Form.Group>
                        <Button className="float-start" variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </Row>
        </Container>
    </div>
  );
}
