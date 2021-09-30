import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../App";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { User, Clipboard } from 'react-feather';

export default function NavBar() {
  const [credentails, setCredentials] = useContext(AuthContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">⚡️<strong>To Do</strong>⚡️</Navbar.Brand>
                    <Nav className="me-auto">
                        { /* Use conditional rendering to show different links in nav */ }
                        <Nav.Link>Dashboard</Nav.Link>
                        <Nav.Link>Sign Out</Nav.Link>
                        {/* <Button color="dark" className="float-end mx-3"><User></User></Button>
                        <Button color="dark" className="float-end mx-3"><Clipboard></Clipboard></Button> */}
                    </Nav>
            </Container>
        </Navbar>
    </div>
  );
}
