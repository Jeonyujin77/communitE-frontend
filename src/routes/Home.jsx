import React from "react";
import styled from "styled-components";

// component
import PostListContainer from "../components/postList/PostList";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";

const Home = () => {
  const navigate = useNavigate();
  const goToWrite = () => {
    navigate("/write");
  };
  return (
    <>
      <Section>
        <ListAddBtnWrap>
          <Button
            onClick={goToWrite}
            width={"200px"}
            height={"50px"}
            fontSize={"20px"}
          >
            게시물 작성
          </Button>
        </ListAddBtnWrap>
      </Section>
      <Section>
        <PostListContainer />
      </Section>
    </>
  );
};

const ListAddBtnWrap = styled.div`
  display: block;
  display: flex;
  align-items: center;
  justify-content: right;
`;
export default Home;
