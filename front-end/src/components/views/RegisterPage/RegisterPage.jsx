/* eslint-disable */
import React, { useState } from "react";
import "../LoginPage/Login.css";
import "../../../assets/css/util.css";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/userAction";

function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPasword, setConfirmPasword] = useState("");
  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Password === ConfirmPasword) {
      let body = {
        email: Email,
        name: Name,
        password: Password,
      };
      dispatch(registerUser(body)).then((res) => {
        alert("가입이 정상적으로 완료되었습니다");
        props.history.push("/login");
      });
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: "100%",
    //     height: "100vh",
    //   }}
    // >
    //   <form
    //     onSubmit={onSubmitHandler}
    //     style={{ display: "flex", flexDirection: "column" }}
    //   >
    //     <label>Email</label>
    //     <input type="email" value={Email} onChange={onEmailHandler} />

    //     <label>Name</label>
    //     <input type="test" value={Name} onChange={onNameHandler} />

    //     <label>Password</label>
    //     <input type="password" value={Password} onChange={onPasswordHanlder} />

    //     <label>ConfirmPasword</label>
    //     <input
    //       type="password"
    //       value={ConfirmPasword}
    //       onChange={onConfirmPasswordHandler}
    //     />
    //     <br />
    //     <button type="submit">회원 가입</button>
    //   </form>
    // </div>

    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login"></div>
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            onSubmit={onSubmitHandler}
          >
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
                type="email"
                name="Email"
                placeholder="Email"
                value={Email}
                onChange={onEmailHandler}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf207;"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter username"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="password"
                value={Password}
                onChange={onPasswordHanlder}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf191;"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <input
                className="input100"
                type="password"
                name="password"
                value={ConfirmPasword}
                placeholder="password"
                onChange={onConfirmPasswordHandler}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf191;"
              ></span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn m-l-20" type="submit">
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
}

export default withRouter(RegisterPage);
