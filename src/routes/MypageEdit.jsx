import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";

const MypageEdit = () => {
  return (
    <Section>
      <MypageEditWrapper>
        <h2>프로필 수정</h2>
        <form>
          <Row>
            <Input type="file" width="350px" />
            <MessageBox>프로필 이미지 사진을 첨부해주세요</MessageBox>
          </Row>
          <Row>
            <Input type="text" width="350px" value="닉네임" />
            <Button btnTheme="secondary">중복확인</Button>
            <MessageBox>닉네임을 입력해주세요</MessageBox>
          </Row>
          <ButtonWrapper>
            <Button>수정하기</Button>
          </ButtonWrapper>
        </form>
      </MypageEditWrapper>
    </Section>
  );
};

const MypageEditWrapper = styled.div`
  margin: 50px auto;
  width: 480px;
`;

const Row = styled.div`
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

const ButtonWrapper = styled.div`
  text-align: center;
  Button {
    margin-top: 50px;
  }
`;

export default MypageEdit;
