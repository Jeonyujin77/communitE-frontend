import React, { useEffect } from "react";
import styled from "styled-components";

import { __getPostsData } from "../redux/modules/postSlice";

// component
import PostListContainer from "../components/postList/PostList";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToWrite = () => {
    navigate("/write");
  };

  //redux의 posts 소환
  const posts = useSelector((state) => state.posts.posts);

  //처음 랜더링 시 posts에 데이터 삽입
  useEffect(() => {
    dispatch(__getPostsData());
  }, [dispatch]);

  // 로그인 유무에 따라 버튼 display 변경
  const isLogined = useSelector((state) => state.user.is_login);

  return (
    <>
      <Section>
        <ListAddBtnWrap isLogined={isLogined}>
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
        <PostListContainer posts={posts} />
      </Section>
    </>
  );
};

const ListAddBtnWrap = styled.div`
  display: ${({ isLogined }) => (isLogined ? "flex" : "none")};
  align-items: center;
  justify-content: right;
`;
export default Home;
