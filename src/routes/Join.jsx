import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import useInput from "../hooks/useInput";
import { __signup } from "../lib/userApi";
import { idCheck, pwCheck } from "../utils/RegExp";

const Join = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginId, setLoginId, loginIdHandler] = useInput(""); // 아이디
  const [nickname, setNickname, nicknameHandler] = useInput(""); // 닉네임
  const [password, setPassword, passwordHandler] = useInput(""); // 비밀번호
  const [confirm, setConfirm, confirmHandler] = useInput(""); // 비밀번호 확인
  const [loginIdValidate, setloginIdValidate] = useState(true); // 아이디 정규식 검증
  const [passwordValidate, setPasswordValidate] = useState(true); // 비밀번호 정규식 검증
  const [confirmValidate, setConfirmValidate] = useState(true); // 비밀번호 확인 검증

  // 아이디 검증
  const validateLoginId = () => {
    if (loginId !== "" && !idCheck(loginId)) {
      setloginIdValidate(false);
      setLoginId("");
    } else {
      setloginIdValidate(true);
    }
  };

  // 비밀번호 검증
  const validatePassword = () => {
    if (password !== "" && !pwCheck(password)) {
      setPasswordValidate(false);
      setPassword("");
    } else {
      setPasswordValidate(true);
    }
  };

  // 비밀번호 확인 검증
  const validateConfirm = () => {
    if (confirm !== "" && password !== confirm) {
      setConfirmValidate(false);
      setConfirm("");
    } else {
      setConfirmValidate(true);
    }
  };

  // 회원가입
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(__signup({ loginId, password, nickname })).then((res) => {
      const { type } = res;

      // 응답이 정상이면
      if (type === "signup/fulfilled") {
        alert("회원가입이 정상적으로 되었습니다.");
        navigate("/login");
      }
    });
  };

  return (
    <Section>
      <JoinWrapper>
        <h2>회원가입</h2>
        <form onSubmit={onSubmit}>
          <JoinRow>
            <Input
              type="text"
              width="350px"
              placeholder="아이디"
              value={loginId}
              onChange={loginIdHandler}
              onBlur={validateLoginId}
              required
            />
            <Button btnTheme="secondary" width="80px" height="30px">
              중복확인
            </Button>
            <MessageBox color={loginIdValidate ? "" : "red"}>
              5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
            </MessageBox>
          </JoinRow>
          <JoinRow>
            <Input
              type="text"
              width="350px"
              placeholder="닉네임"
              value={nickname}
              onChange={nicknameHandler}
              required
            />
            <Button btnTheme="secondary" width="80px" height="30px">
              중복확인
            </Button>
            <MessageBox>닉네임을 입력해주세요</MessageBox>
          </JoinRow>
          <JoinRow>
            <Input
              type="password"
              width="350px"
              placeholder="비밀번호"
              value={password}
              onChange={passwordHandler}
              onBlur={validatePassword}
              required
            />
            <MessageBox color={passwordValidate ? "" : "red"}>
              비밀번호 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
            </MessageBox>
          </JoinRow>
          <JoinRow>
            <Input
              type="password"
              width="350px"
              placeholder="비밀번호 확인"
              value={confirm}
              onChange={confirmHandler}
              onBlur={validateConfirm}
              required
            />
            <MessageBox color={confirmValidate ? "" : "red"}>
              비밀번호를 다시 입력해주세요
            </MessageBox>
          </JoinRow>
          <ButtonWrapper>
            <Button width="100px" height="30px" type="submit">
              가입하기
            </Button>
          </ButtonWrapper>
        </form>
      </JoinWrapper>
    </Section>
  );
};

const JoinWrapper = styled.div`
  margin: 50px auto;
  width: 480px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  Button {
    margin-top: 50px;
  }
`;
const JoinRow = styled.div`
  margin: 10px 0;
  Button {
    margin-left: 5px;
  }
`;
const MessageBox = styled.p`
  font-size: 13px;
  margin: 15px 0;
  color: ${(props) => props.color || "#7f8fa6"};
  text-align: left;
`;

export default Join;
