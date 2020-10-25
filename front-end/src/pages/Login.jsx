// 로그인 페이지입니다.

// 홈페이지에 처음 접속했을 때 보여지는 화면입니다.

// 로그인에 관한 컴포넌트로 작성해주세요.

// 영진 작성 예정.

import React from "react";
import "./Login.css";
import "../assets/css/util.css";

const Login = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form">
            {/* <span className="login100-form-logo">
              <i className="zmdi zmdi-landscape"></i>
            </span> */}

            {/* <span className="login100-form-title p-b-40 p-t-20">
              암기의 정석
            </span> */}

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter username"
            >
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Username"
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf207;"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf191;"
              ></span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn m-r-20">로그인</button>
              <button className="login100-form-btn m-l-20">회원가입</button>
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

export default Login;
