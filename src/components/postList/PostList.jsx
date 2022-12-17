import styled from "styled-components";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const PostListContainer = () => {
  const navigate = useNavigate();
  //임시 json객체
  const list = [
    {
      id: 1,
      nickname: "royud",
      title: "wow",
      createdAt: "2022.00.00",
    },
    {
      id: 2,
      nickname: "royuddddddddddddddddddddddddddddddddddddddddd",
      title: "wowwwwwwwwwwwwwwwwwwwww",
      createdAt: "2022.00.00",
    },
    {
      id: 3,
      nickname: "royud",
      title: "wow",
      createdAt: "2022.00.00",
    },
    {
      id: 4,
      nickname: "royud",
      title: "wow",
      createdAt: "2022.00.00",
    },
    {
      id: 5,
      nickname: "royud",
      title: "wow",
      createdAt: "2022.00.00",
    },
  ];
  const goToDetail = (id) => {
    navigate(`/post/${id}`);
  };
  return (
    <PostListWrapper>
      {list.map((post) => (
        <PostList key={post.id} onClick={() => goToDetail(post.id)}>
          <div className="postImg"></div>
          <PostComtent>
            <div className="postTitle">{post.title}</div>
            <div className="postNickname">{post.nickname}</div>
            <div className="postCreatedAt">{post.createdAt}</div>
          </PostComtent>
        </PostList>
      ))}
    </PostListWrapper>
  );
};

//styled-components
const PostListWrapper = styled.ul`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;
const PostList = styled.li`
  height: 350px;
  width: 291px;
  cursor: pointer;
  .postImg {
    width: 100%;
    height: 200px;
    background-color: #8d85b8;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;
const PostComtent = styled.div`
  padding: 0 10px;
  .postTitle {
    font-size: 25px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .postNickname {
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .postCreatedAt {
    color: grey;
  }
`;

export default PostListContainer;
