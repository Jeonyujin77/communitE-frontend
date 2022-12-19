import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import useInput from "../hooks/useInput";
import { __getUserInfo } from "../lib/userApi";

const MypageEdit = () => {
  const { user } = useSelector((state) => state.user); // 사용자정보 가져오기
  const dispatch = useDispatch();
  const [nickname, setNickname, nicknameHandler] = useInput(user?.nickname);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    dispatch(__getUserInfo(user?.userId));
  }, []);

  if (!user) {
    return <></>;
  }

  const onChangeFile = (event) => {
    if (event.target.files !== undefined) {
      setProfile(event.target.files[0]);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Section>
      <MypageEditWrapper>
        <h2>프로필 수정</h2>
        <form onSubmit={onSubmit}>
          <Row>
            <Input type="file" width="350px" onChange={onChangeFile} />
            <MessageBox>프로필 이미지 사진을 첨부해주세요</MessageBox>
          </Row>
          <Row>
            <Input
              type="text"
              width="350px"
              value={nickname}
              onChange={nicknameHandler}
              required
            />
            <Button btnTheme="secondary" width="80px" height="30px">
              중복확인
            </Button>
            <MessageBox>닉네임을 입력해주세요</MessageBox>
          </Row>
          <ButtonWrapper>
            <Button width="100px" height="30px" type="submit">
              수정하기
            </Button>
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
