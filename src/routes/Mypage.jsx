import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";
import { Colors } from "../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import PostListContainer from "../components/postList/PostList";
import { __getUserPosts } from "../lib/postApi";
import { logout } from "../redux/modules/userSlice";

const Mypage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // 사용자정보 가져오기
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  // 로그인 확인
  useAuth();

  const onProfileEdit = () => {
    navigate(`/mypagemodify`);
  };

  useEffect(() => {
    if (user !== null) {
      dispatch(__getUserPosts(user.userId)).then((res) => {
        const { type, payload } = res;

        // 응답이 정상이면
        if (type === "getUserPosts/fulfilled") {
          setPosts(payload.posts);
        } else {
          dispatch(logout());
        }
      });
    }
  }, [user, dispatch]);

  return user ? (
    <Section>
      <ProfileWrapper>
        <ProfileBox>
          {user.image !== null ? (
            <img src={`${user.image}`} alt="프로필" />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="기본프로필"
            />
          )}
        </ProfileBox>
        <UserInfo>
          <p>{`${user.nickname}`}</p>
          <Button
            btnTheme="secondary"
            width="80px"
            height="30px"
            onClick={onProfileEdit}
          >
            프로필 수정
          </Button>
        </UserInfo>
      </ProfileWrapper>
      <UsersPosts>
        <h3>내 게시글</h3>
        {posts.length !== 0 ? (
          <PostListContainer posts={posts} />
        ) : (
          "작성한 게시글이 없습니다"
        )}
      </UsersPosts>
    </Section>
  ) : (
    ""
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
