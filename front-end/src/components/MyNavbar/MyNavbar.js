import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import './MyNavbar.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/userAction';
import SERVER from '../../api/server';

const MyNavbar = (props) => {
  const [showSearch, setShowSearch] = useState(false);
  const collapseRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleSearch = () => {
    // console.log('toggleSearch called.');
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
      .post(SERVER.BASE_URL + SERVER.ROUTES.logout, null, { withCredentials: true })
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
    localStorage.removeItem('Authorization');
  };

  return (
    <Navbar className="my-navbar" expand="lg">
      <Navbar.Brand>
        <Link to="/" onClick={resetSearch}>
          <p className="service-title">
            암기<small style={{ fontFamily: 'ChosunKm' }}>의</small>정석
          </p>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'rgba(255,255,255,1)' }} id="toggle-button" ref={toggleButtonRef} />
      <Navbar.Collapse id="basic-navbar-nav" ref={collapseRef}>
        <Nav className="container-fluid">
          {showSearch ? (
            <Search collapseRef={collapseRef} toggleSearch={toggleSearch} toggleButtonRef={toggleButtonRef} />
          ) : (
            <Menu collapseRef={collapseRef} toggleSearch={toggleSearch} toggleButtonRef={toggleButtonRef} />
          )}
        </Nav>
        {showSearch ? null : (
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
            {/* <button type="button" className="btn btn-warning" onClick={onClickHandler}>
              <span style={{ fontWeight: '800' }}>로그아웃</span>
            </button> */}

            <Button className="nav-logout-btn" onClick={onClickHandler}>
              <p style={{ fontWeight: '900', color: 'black', fontSize: '1em' }}>로그아웃</p>
            </Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const Menu = ({ toggleSearch, toggleButtonRef, collapseRef }) => {
  return (
    <>
      <Nav.Link onClick={toggleSearch}>
        <div className="nav-search-btn">검색</div>
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/sets"
        onClick={() => {
          var cName = collapseRef.current.className;
          if (cName.includes('show')) {
            toggleButtonRef.current.click();
          }
        }}
      >
        <div className="nav-set-btn">세트</div>
      </Nav.Link>
    </>
  );
};

const Search = ({ toggleSearch, toggleButtonRef, collapseRef }) => {
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
                var cName = collapseRef.current.className;

                if (cName.includes('show')) {
                  toggleButtonRef.current.click();
                }

                toggleSearch();
                const searchValue = inputRef.current.value;
                inputRef.current.value = '';
                history.push({ pathname: '/search', state: { searchValue } });
              }
            }}
          />
        </InputGroup>
        <InputGroup.Append className="col-1">
          {/* <Button variant="outline-secondary" onClick={toggleSearch} style={{ marginLeft: '1px' }} ref={buttonRef}>
            <MdClose />
          </Button> */}

          <Button className="nav-search-close" onClick={toggleSearch} style={{ marginLeft: '1px' }} ref={buttonRef}>
            <MdClose />
          </Button>
        </InputGroup.Append>
      </div>
    </>
  );
};
export default withRouter(MyNavbar);
