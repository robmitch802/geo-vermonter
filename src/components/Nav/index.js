import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
<Container>
    <Navbar fixed="top" bg="light" variant="light" expand="md" collapseOnSelect >
        <Navbar.Brand>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="mr-auto" >
                <Nav.Link as={Link} to={ROUTES.HOME} className="nav-link">Home</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.GAME} className="nav-link">Game</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.SCORES} >Scores</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
</Container>
);

export default Navigation;