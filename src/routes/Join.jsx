import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import { Colors } from "../styles/colors";

const Join = () => {
  return (
    <Section>
      <JoinWrapper>
        <h2>회원가입</h2>
        <form>
          <JoinRow>
            <Input type="text" width="350px" placeholder="아이디" />
            <Button btnTheme="secondary">중복확인</Button>
            <MessageBox color="red">
              5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
            </MessageBox>
          </JoinRow>
          <JoinRow>
            <Input type="text" width="350px" placeholder="닉네임" />
            <Button btnTheme="secondary">중복확인</Button>
            <MessageBox>닉네임을 입력해주세요</MessageBox>
          </JoinRow>
          <JoinRow>
            <Input type="password" width="350px" placeholder="비밀번호" />
            <MessageBox>
              비밀번호 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
            </MessageBox>
          </JoinRow>
          <JoinRow>
            <Input type="password" width="350px" placeholder="비밀번호 확인" />
            <MessageBox>비밀번호를 다시 입력해주세요</MessageBox>
          </JoinRow>
          <ButtonWrapper>
            <Button>가입하기</Button>
          </ButtonWrapper>
        </form>
      </JoinWrapper>
    </Section>
  );
};

const JoinWrapper = styled.div`
  margin: 50px auto;
  width: 480px;

  Button {
    margin-left: 5px;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  Button {
    margin-top: 50px;
  }
`;
const JoinRow = styled.div`
  margin: 10px 0;
`;
const MessageBox = styled.p`
  font-size: 13px;
  margin: 15px 0;
  color: ${(props) => props.color || "#7f8fa6"};
  text-align: left;
`;

export default Join;
