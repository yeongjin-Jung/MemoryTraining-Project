// 로그인 페이지입니다.

// 홈페이지에 처음 접속했을 때 보여지는 화면입니다.

// 로그인에 관한 컴포넌트로 작성해주세요.

// 영진 작성 예정.
import React, { useState } from 'react';
import '../LoginPage/Login.css';
import '../../assets/css/util.css';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/userAction';
import axios from 'axios';
import SERVER from '../../api/server';

const LoginPage = (props) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (localStorage.getItem('Authorization') != null) {
      localStorage.removeItem('Authorization');
    }

    //로그인을 진행하기위해서
    //첫번째 useDispatch(액션) 을 활용해서 액션을 dispatch해준다
    const body = {
      email: Email,
      password: Password,
    };
    // dispatch(loginUser(body))
    //   .then((res) => {
    //     console.log(res);
    //     if (res.type == 'LOGIN_USER') {
    //       localStorage.setItem('Authorization', 'JWT ' + res.payload.token);
    //       props.history.push('/');
    //     } else {
    //       alert(res.payload.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.login,
        {
          email: Email,
          password: Password,
        },
        { withCredentials: true },
      )
      .then(function (response) {
        console.log(response);
        alert('로그인이 정상적으로 완료되었습니다');
        if (response.status == 200) {
          localStorage.setItem('Authorization', 'JWT ' + response.data.token);
          localStorage.setItem('User id', response.data.user.id);
          localStorage.setItem('User email', response.data.user.email);
          localStorage.setItem('User name', response.data.user.name);
        }
        props.history.push('/');
      })
      .catch(function (error) {
        alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
        // console.log(error);
      });
  };
  const redirectToRegister = () => {
    props.history.push('/register');
  };

  return (
    <div className="background" role="group" aria-label="actionButtons">
      <div className="container-login100">
        <div className="wrap-login"></div>
        <div className="wrap-login100">
          <form className="login100-form " onSubmit={onSubmitHandler}>
            {/* <span className="login100-form-logo">
              <i className="zmdi zmdi-landscape"></i>
            </span> */}

            {/* <span className="login100-form-title p-b-40 p-t-20">
              암기의 정석
            </span> */}

            <div className="wrap-input100 " data-validate="Enter username">
              <input className="input100" type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} />
              <span className="focus-input100" data-placeholder="&#xf207;"></span>
            </div>

            <div className="wrap-input100 " data-validate="Enter password">
              <input className="input100" type="password" name="password" value={Password} placeholder="Password" onChange={onPasswordHanlder} />
              <span className="focus-input100" data-placeholder="&#xf191;"></span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn m-r-20" type="submit">
                로그인
              </button>
              <button className="login100-form-btn m-l-20" onClick={() => redirectToRegister()}>
                회원가입
              </button>
            </div>
            {/* <div className="text-center p-t-30">
              <a className="txt1" href="#">
                Forgot Password?
              </a>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
