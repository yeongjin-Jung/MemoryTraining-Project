import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { MdClose } from 'react-icons/md';
import './MyNavbar.css';

const MyNavbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const resetSearch = () => {
    setShowSearch(false);
  };

  return (
    <Navbar className="my-navbar" bg="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.3rem' }} onClick={resetSearch}>
          암기의 정석
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {showSearch ? <Search toggleSearch={toggleSearch} /> : <Menu toggleSearch={toggleSearch} />}

          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {showSearch ? null : (
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
            <Button variant="outline-success">로그아웃</Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const Menu = ({ toggleSearch }) => {
  return (
    <>
      <Nav.Link style={{ textDecoration: 'none', color: 'grey' }} onClick={toggleSearch}>
        검색
      </Nav.Link>
      <Nav.Link as={Link} to="/sets" style={{ textDecoration: 'none', color: 'grey' }}>
        세트
      </Nav.Link>
    </>
  );
};

const Search = ({ toggleSearch }) => {
  const history = useHistory();

  return (
    <>
      <InputGroup className="" style={{ width: '1350px', background: 'transparent' }}>
        <FormControl
          className="input-search"
          placeholder="검색하기"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onKeyPress={(event) => {
            if (event.key == 'Enter') {
              alert('enter pressed.');
              history.push('/search');
            }
          }}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={toggleSearch} style={{ marginLeft: '1px' }}>
            <MdClose />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};
export default MyNavbar;
