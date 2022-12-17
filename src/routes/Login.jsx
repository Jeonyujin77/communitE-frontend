import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import { Colors } from "../styles/colors";

const Login = () => {
  return (
    <Section>
      <LoginWrapper>
        <LoginForm>
          <p>Communit-E</p>
          <LoginRow>
            <Input
              type="text"
              width="300px"
              placeholder="아이디를 입력해주세요"
            />
          </LoginRow>
          <LoginRow>
            <Input
              type="password"
              width="300px"
              placeholder="비밀번호를 입력해주세요"
            />
          </LoginRow>
          {/* <MessageBox>아이디를 입력해주세요</MessageBox> */}
          <Button>로그인</Button>
        </LoginForm>
        {/* ToDo: 회원가입 페이지로 이동 */}
        <Link>회원가입</Link>
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

const MessageBox = styled.div`
  font-size: 13px;
  margin: 20px 0;
  color: #ff003e;
`;

export default Login;
