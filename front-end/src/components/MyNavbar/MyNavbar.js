import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import './MyNavbar.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/userAction';

const MyNavbar = (props) => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    console.log('toggleSearch called.');
    setShowSearch(!showSearch);
  };

  const resetSearch = () => {
    setShowSearch(false);
  };

  const dispatch = useDispatch();
  const onClickHandler = () => {
    //useDispatch를 사용해서 로그아웃 액션을 실행한다
    //useDispatch와 logout 액션이 두가지 필요하다
    // dispatch(logoutUser())
    //   .then((res) => {
    //     console.log(res);
    //     if (res.payload.status == 200) {
    //       localStorage.removeItem('Authorization');
    //       props.history.push('/login');
    //     } else {
    //       alert(res.payload.detail);
    //     }
    // if (res.) {
    // } else {
    //   alert('로그아웃에 실패하였습니다');
    // }
    // })
    // .catch((err) => console.log(err));
    const token = localStorage.getItem('Authorization');
    const config = {
      Authorization: token,
    };
    axios
      .post('http://127.0.0.1:8000/api/rest-auth/logout/', null, config, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          localStorage.removeItem('Authorization');
          props.history.push('/login');
        } else {
          console.log(response.statusText);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <Nav className="container-fluid">
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
            <Button variant="outline-success" onClick={onClickHandler}>
              로그아웃
            </Button>
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
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
        // alert('You clicked outside of me!');
        toggleSearch();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Unbind the event listener on clean up
    };
  }, [buttonRef]);

  return (
    <>
      {/* <div className="col-sm-10" style={{ backgroundColor: 'red' }}>
        red
      </div>
      <div className="col-sm-2" style={{ backgroundColor: 'yellow' }}>
        yellow
      </div> */}
      <div className="container-fluid search">
        <InputGroup className="col-11" style={{ background: 'transparent' }}>
          <FormControl
            ref={inputRef}
            className="input-search"
            placeholder="검색하기"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onKeyPress={(event) => {
              if (event.key == 'Enter') {
                inputRef.current.value = '';
                toggleSearch();
                history.push('/search');
              }
            }}
          />
        </InputGroup>
        <InputGroup.Append className="col-1">
          <Button variant="outline-secondary" onClick={toggleSearch} style={{ marginLeft: '1px' }} ref={buttonRef}>
            <MdClose />
          </Button>
        </InputGroup.Append>
      </div>
    </>
  );
};
export default withRouter(MyNavbar);
