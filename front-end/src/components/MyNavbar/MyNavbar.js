import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import './MyNavbar.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import SERVER from '../../api/server';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const MyNavbar = (props) => {
  // const [prevAllSet, setprevAllSet] = useState([]);
  // const [newAllSet, setnewAllSet] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const collapseRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleSearch = async () => {
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
    //     //수정 console.log(res);
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
    // .catch((err) => //수정 console.log(err));
    const token = localStorage.getItem('Authorization');
    const config = {
      Authorization: token,
    };
    axios
      .post(SERVER.BASE_URL + SERVER.ROUTES.logout, null, { withCredentials: true })
      .then(function (response) {
        //수정 console.log(response);
        if (response.status == 200) {
          localStorage.removeItem('Authorization');
          props.history.push('/login');
        } else {
          //수정 console.log(response.statusText);
        }
      })
      .catch(function (error) {
        //수정 console.log(error);
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
        <div className="nav-set-btn">내 세트</div>
      </Nav.Link>
    </>
  );
};

const Search = ({ toggleSearch, toggleButtonRef, collapseRef }) => {
  const history = useHistory();
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  const [allSet, setAllSet] = useState([]);
  
  const [open, setOpen] = useState(false);
  const loading = open && allSet.length === 0;


  // useEffect(() => {
  //   inputRef.current.focus();

  //   axios.get(SERVER.BASE_URL + SERVER.ROUTES.search).then((res) => {
  //     //수정 console.log(res.data);
  //     setAllSet(res.data);
  //   });
  // }, [buttonRef]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(SERVER.BASE_URL + SERVER.ROUTES.search);
      await sleep(1e3); // For demo purposes.
      // const countries = await response.json();

      if (active) {
        // //수정 console.log(response)
        setAllSet(response.data);
        // setAllSet(Object.keys(response).map((key) => response[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setAllSet([]);
    }
  }, [open]);

  return (
    <>
      <div className="container-fluid search">
        <InputGroup className="col-10" style={{ background: 'transparent' }}>
          {/* <FormControl
            ref={inputRef}
            className="input-search"
            placeholder="검색하기"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={() => {
              axios.get(SERVER.BASE_URL + SERVER.ROUTES.search).then((res) => {
                //수정 console.log(res.data);
                setAllSet(res.data);
              });
            }}
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
          /> */}

          <Autocomplete
            id="asynchronous-demo"
            style={{ width: '100%', backgroundColor: 'white', borderRadius: '4px' }}
            ref={inputRef}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionSelected={(aset, value) => aset.id === value.id}
            getOptionLabel={(aset) => aset.title}
            options={allSet}
            loading={loading}
            renderInput={(params) => (
              <TextField {...params} label="세트를 검색해보세요" variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            
            onKeyPress={(event) => {
              if (event.key == 'Enter') {
                var cName = collapseRef.current.className;

                if (cName.includes('show')) {
                  toggleButtonRef.current.click();
                }

                toggleSearch();
                // const searchValue = inputRef.current.value;
                const searchValue = event.target.value;

                inputRef.current.value = '';
                history.push({ pathname: '/search', state: { searchValue } });
              }
            }}
          />
        </InputGroup>
        <InputGroup.Append className="col-2">
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
