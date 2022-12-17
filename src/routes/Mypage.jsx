import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";
import { Colors } from "../styles/colors";

const Mypage = () => {
  const navigate = useNavigate();
  const onProfileEdit = () => {
    navigate("/mypagemodify");
  };

  return (
    <Section>
      <ProfileWrapper>
        <ProfileBox>
          <img src="https://i.ibb.co/zPcdbH8/pngegg.png" alt="기본프로필" />
        </ProfileBox>
        <UserInfo>
          <p>닉네임</p>
          <Button btnTheme="secondary" onClick={onProfileEdit}>
            프로필 수정
          </Button>
        </UserInfo>
      </ProfileWrapper>
      <UsersPosts>
        <h3>내 게시글</h3>
      </UsersPosts>
    </Section>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding: 50px 20px;
  border-bottom: 1px solid ${Colors.lightGrey};
`;

const ProfileBox = styled.div`
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: ${Colors.lightGrey};
  border-radius: 50px;
  margin-right: 20px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50px;
  }
`;

const UserInfo = styled.div`
  p {
    margin: 10px 0;
    font-size: 20px;
  }
`;

const UsersPosts = styled.div`
  h3 {
    text-align: center;
  }
`;
export default Mypage;
