/* eslint-disable */
import React, { useState } from "react";
import "./Register.css";
import "../../assets/css/util.css";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/userAction";

function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPasword, setConfirmPasword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.target.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.target.value);
    if (e.target.value == "" && Password == "") {
      setPasswordError(false);
    }
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
    setPasswordError(e.target.value !== Password);
    if (e.currentTarget.value == "" && Password == "") {
      setPasswordError(false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Email == "") {
      alert("이메일을 입력해 주세요");
      return;
    }
    if (Name == "") {
      alert("이름을 입력해 주세요");
      return;
    }
    if (Password == "") {
      alert("비밀번호를 입력해 주세요");
      return;
    }
    if (ConfirmPasword == "") {
      alert("확인 비밀번호를 입력해 주세요");
      return;
    }

    if (Password === ConfirmPasword) {
      console.log(Name);
      console.log(Email);

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
      setPasswordError(true);
      alert("비밀번호가 일치하지 않습니다");
    }
  };
  return (
    <div className="background">
      <div className="container-register100">
        <div className="wrap-register"></div>
        <div className="wrap-register100">
          <form
            className="register100-form validate-form"
            onSubmit={onSubmitHandler}
          >
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter useremail"
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
                data-placeholder="&#xf15a;"
              ></span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter username"
            >
              <input
                className="input100"
                type="name"
                name="name"
                placeholder="Name"
                value={Name}
                onChange={onNameHandler}
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
                placeholder="Password"
                value={Password}
                onChange={onPasswordHanlder}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xf190;"
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
                placeholder="Confirm Password"
                onChange={onConfirmPasswordHandler}
              />

              <span
                className="focus-input100"
                data-placeholder="&#xf191;"
              ></span>
              {passwordError && (
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
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
