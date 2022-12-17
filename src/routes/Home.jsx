import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getPostsData } from "../redux/modules/postSlice";

// component
import PostListContainer from "../components/postList/PostList";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";

import axios from "../../node_modules/axios/index";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToWrite = () => {
    navigate("/write");
  };

  const getPost = async () => {
    try {
      const {
        data: { posts },
      } = await axios.get("http://geniuskim.shop/api/posts");
      dispatch(getPostsData(posts));
    } catch (err) {
      console.log(err);
    }
  };
  const posts = useSelector((state) => state.posts.posts);
  useEffect(() => {
    getPost();
  }, []);
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
        <PostListContainer posts={posts} />
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
