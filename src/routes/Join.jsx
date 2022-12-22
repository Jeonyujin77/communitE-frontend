import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import useInput from "../hooks/useInput";
import { __checkDuplicate, __signup } from "../lib/userApi";
import { idCheck, pwCheck } from "../utils/RegExp";

const Join = () => {
  const navigate = useNavigate();
  const is_token = document.cookie; // 쿠키
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [loginId, setLoginId] = useState(""); // 아이디
  const [nickname, setNickname] = useState(""); // 닉네임
  const [password, passwordHandler] = useInput(""); // 비밀번호
  const [confirm, confirmHandler] = useInput(""); // 비밀번호 확인
  const [loginIdValidate, setloginIdValidate] = useState(true); // 아이디 정규식 검증
  const [passwordValidate, setPasswordValidate] = useState(true); // 비밀번호 정규식 검증
  const [confirmValidate, setConfirmValidate] = useState(true); // 비밀번호 확인 검증
  const [checkIdDup, setCheckIdDup] = useState(false); // 아이디 중복 검증
  const [checkNickDup, setCheckNickDup] = useState(false); // 닉네임 중복 검증

  // 로그인한 상태이면 메인으로 리다이렉트시킴
  useEffect(() => {
    if (is_token !== "" && userId !== null) navigate("/");
  }, [is_token, userId, navigate]);

  // 아이디 입력 시
  const onChangeId = (e) => {
    setLoginId(e.target.value);
    setCheckIdDup(false); // 입력 시 중복확인 false
  };

  // 닉네임 입력 시
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    setCheckNickDup(false); // 입력 시 중복확인 false
  };

  // 아이디 검증
  const validateLoginId = () => {
    if (loginId !== "" && !idCheck(loginId)) {
      setloginIdValidate(false);
    } else {
      setloginIdValidate(true);
    }
  };

  // 비밀번호 검증
  const validatePassword = () => {
    if (password !== "" && !pwCheck(password)) {
      setPasswordValidate(false);
    } else {
      setPasswordValidate(true);
    }
  };

  // 비밀번호 확인 검증
  const validateConfirm = () => {
    if (confirm !== "" && password !== confirm) {
      setConfirmValidate(false);
    } else {
      setConfirmValidate(true);
    }
  };

  // 아이디, 닉네임 중복확인
  const checkDuplicate = (text, checkType) => {
    if (text === "") {
      alert("입력 후 중복확인해주세요.");
      return;
    }

    dispatch(__checkDuplicate(text)).then((res) => {
      const { type } = res;
      // 응답이 정상이면
      if (type === "checkDuplicate/fulfilled" && checkType === "id") {
        setCheckIdDup(true);
        alert("사용가능한 아이디입니다.");
      } else if (
        type === "checkDuplicate/fulfilled" &&
        checkType === "nickname"
      ) {
        setCheckNickDup(true);
        alert("사용가능한 닉네임입니다.");
      }
    });
  };

  // 회원가입
  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      loginIdValidate && // 아이디값이 유효하고
      passwordValidate && // 비밀번호값이 유효하고
      confirmValidate && // 비밀번호 확인을 했고
      checkIdDup && // 아이디중복확인을 했고
      checkNickDup // 닉네임중복확인을 했을 때
    ) {
      dispatch(__signup({ loginId, password, nickname })).then((res) => {
        const { type, payload } = res;
        // 응답이 정상이면
        if (type === "signup/fulfilled") {
          alert(`${payload.message}`);
          navigate("/login");
        }
      });
    } else {
      alert("중복확인 및 아이디, 비밀번호를 형식에 맞게 다시 입력해주세요.");
    }
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
              onChange={onChangeId}
              onBlur={validateLoginId}
              required
            />
            <DupCheck onClick={() => checkDuplicate(loginId, "id")}>
              중복확인
            </DupCheck>
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
              onChange={onChangeNickname}
              required
            />
            <DupCheck onClick={() => checkDuplicate(nickname, "nickname")}>
              중복확인
            </DupCheck>
            <MessageBox>닉네임을 입력하세요.</MessageBox>
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
              비밀번호를 다시 입력해주세요.
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

const DupCheck = styled.span`
  display: inline-block;
  width: 80px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  color: tomato;
`;

export default Join;
