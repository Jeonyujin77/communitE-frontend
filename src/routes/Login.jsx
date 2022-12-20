import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import useInput from "../hooks/useInput";
import { __login } from "../lib/userApi";
import { Colors } from "../styles/colors";

const Login = () => {
  const navigate = useNavigate();
  const { is_login } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loginId, loginIdHandler] = useInput(""); // 아이디
  const [password, passwordHandler] = useInput(""); // 비밀번호

  // 로그인 되어있으면 메인으로 이동한다.
  useEffect(() => {
    if (is_login) navigate("/");
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(__login({ loginId, password })).then((res) => {
      const { type } = res;

      // 응답이 정상이면
      if (type === "login/fulfilled") {
        alert("로그인에 성공했습니다.");
        navigate("/");
      }
    });
  };

  return (
    <Section>
      <LoginWrapper>
        <LoginForm onSubmit={onSubmit}>
          <p>Communit-E</p>
          <LoginRow>
            <Input
              type="text"
              width="300px"
              placeholder="아이디를 입력해주세요"
              value={loginId}
              onChange={loginIdHandler}
              required
            />
          </LoginRow>
          <LoginRow>
            <Input
              type="password"
              width="300px"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={passwordHandler}
              required
            />
          </LoginRow>
          <Button width="100px" height="30px">
            로그인
          </Button>
        </LoginForm>
        <Link to="/join">회원가입</Link>
      </LoginWrapper>
    </Section>
  );
};

const LoginWrapper = styled.div`
  width: 460px;
  margin: 100px auto;
  a {
    display: block;
    color: ${Colors.purple};
    text-decoration: none;
    text-align: right;
    margin: 10px 0;
  }
`;

const LoginForm = styled.form`
  border: 1px solid ${Colors.lightGrey};
  border-radius: 5px;
  text-align: center;
  padding: 40px;
  p {
    margin-bottom: 50px;
    font-size: 30px;
    font-weight: bold;
  }
  Button {
    margin-top: 30px;
  }
`;
const LoginRow = styled.div`
  margin: 10px 0;
  text-align: center;
`;

export default Login;
