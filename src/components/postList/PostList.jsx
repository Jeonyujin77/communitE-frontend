import styled from "styled-components";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const PostListContainer = ({ posts }) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate(`/post/${id}`);
  };
  return (
    <PostListWrapper>
      {posts.map((post) => (
        <PostList
          key={post.postId}
          onClick={() => goToDetail(post.postId)}
          thumnail={post.image}
        >
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
    background-image: url(${({ thumnail }) => thumnail});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
const PostComtent = styled.div`
  padding: 0 10px;
  .postTitle {
    font-size: 25px;
    margin-bottom: 10px;
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
