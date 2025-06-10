/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="w-100">
      <Container fluid>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand as="a">
            <Image src="/images/AS-Logo-NavBar.png" alt="AgentSecure Logo" width={50} height={50} className="d-inline-block align-top me-2" />
            AgentSecure
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className="nav-link" href="/vendors" style={{ color: 'lightblue' }}>
              Vendors
            </Link>
            <Link className="nav-link" href="/categories" style={{ color: 'lightblue' }}>
              Categories
            </Link>
            <Link className="nav-link" href="/" style={{ color: 'lightblue' }}>
              Logins
            </Link>
          </Nav>

          {/* Right side: User Profile + Sign Out */}
          <Nav className="align-items-center">
            <Link className="nav-link" href="/users" style={{ color: 'lightblue' }}>
              User Profile
            </Link>
            <Button variant="outline-light" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
