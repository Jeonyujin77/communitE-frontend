import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "../../node_modules/react-router-dom/dist/index";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";

const CommentToggle = ({ desc, inputActive }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(desc);
  }, []);

  const writeComment = ({ target: { value } }) => {
    setInputValue(value);
  };
  return (
    <CommentRight inputActive={inputActive}>
      <div className="commentDesc">{desc}</div>
      <textarea
        type="text"
        className="commentInput"
        value={inputValue}
        onChange={writeComment}
      ></textarea>
    </CommentRight>
  );
};
const CommentComponent = ({ list: { nickname, desc } }) => {
  const [inputActive, setInputActive] = useState(false);

  // commentDesc창 토글
  const commentToggle = () => {
    setInputActive(!inputActive);
  };
  // 댓글 삭제
  const commentDelete = () => {
    console.log("댓글 삭제!");
  };
  // 댓글 수정
  const commentRetouch = () => {
    console.log("댓글 수정");
    setInputActive(!inputActive);
  };
  return (
    <>
      <CommentsWrap>
        <CommentLeft>
          <div className="commentNickname">{nickname}</div>
          <div className="commentBtnWrap">
            {inputActive ? (
              <>
                <Button onClick={commentRetouch} width={"50px"} height={"25px"}>
                  등록
                </Button>
                <Button onClick={commentToggle} width={"50px"} height={"25px"}>
                  취소
                </Button>
              </>
            ) : (
              <>
                <Button onClick={commentToggle} width={"50px"} height={"25px"}>
                  수정
                </Button>
                <Button onClick={commentDelete} width={"50px"} height={"25px"}>
                  삭제
                </Button>
              </>
            )}
          </div>
        </CommentLeft>
        <CommentToggle desc={desc} inputActive={inputActive} />
      </CommentsWrap>
    </>
  );
};
const DetailPage = () => {
  const params = useParams().id;

  const commentList = [
    {
      id: 1,
      nickname: "로이어드",
      desc: "찬미를 위하여 그들은 열매를 되는 길지 교향악이다. 같이, 뜨고, 용기가얼마나청춘의청춘의사막이다. 청춘은 웅대한 스며들어 평화스러운 오직 쓸쓸하랴? 인간의 우리의 이상은 하는 힘차게 봄바람이다. 구하기 구하지 눈이 가는 있다.",
    },
    {
      id: 2,
      nickname: "로이어드",
      desc: "찬미를 위하여 그들은 열매를 되는 길지 교향악이다. 같이, 뜨고, 용기가얼마나청춘의청춘의사막이다. 청춘은 웅대한 스며들어 평화스러운 오직 쓸쓸하랴? 인간의 우리의 이상은 하는 힘차게 봄바람이다. 구하기 구하지 눈이 가는 있다.",
    },
    {
      id: 3,
      nickname: "로이어드",
      desc: "찬미를 위하여 그들은 열매를 되는 길지 교향악이다. 같이, 뜨고, 용기가얼마나청춘의청춘의사막이다. 청춘은 웅대한 스며들어 평화스러운 오직 쓸쓸하랴? 인간의 우리의 이상은 하는 힘차게 봄바람이다. 구하기 구하지 눈이 가는 있다.",
    },
    {
      id: 4,
      nickname: "로이어드",
      desc: "찬미를 위하여 그들은 열매를 되는 길지 교향악이다. 같이, 뜨고, 용기가얼마나청춘의청춘의사막이다. 청춘은 웅대한 스며들어 평화스러운 오직 쓸쓸하랴? 인간의 우리의 이상은 하는 힘차게 봄바람이다. 구하기 구하지 눈이 가는 있다.",
    },
  ];

  // 댓글 등록
  const commentPost = () => {
    console.log("댓글 등록");
  };

  return (
    <>
      <DetailTop>
        <div className="postTitle">wow</div>
        <div className="btnWrap">
          <Button width={"100px"} height={"40px"}>
            게시글 수정
          </Button>
          <Button width={"100px"} height={"40px"}>
            게시글 삭제
          </Button>
        </div>
      </DetailTop>
      <PostImg>
        <div className="PostImg"></div>
      </PostImg>
      <Section>
        <PostContent>
          <div className="postDesc">
            찬미를 위하여 그들은 열매를 되는 길지 교향악이다. 같이, 뜨고,
            용기가얼마나청춘의청춘의사막이다. 청춘은 웅대한 스며들어 평화스러운
            오직 쓸쓸하랴? 인간의 우리의 이상은 하는 힘차게 봄바람이다. 구하기
            구하지 눈이 가는 있다.
          </div>
        </PostContent>
      </Section>
      <CommentWrap>
        <CommentInputWrap>
          <div className="commentInputTop">
            <div>
              댓글 <span>({commentList.length})</span>
            </div>
            <Button onClick={commentPost} width={"90px"} height={"30px"}>
              등록
            </Button>
          </div>
          <textarea></textarea>
        </CommentInputWrap>
        {commentList.map((list) => (
          <CommentComponent key={list.id} list={list} />
        ))}
      </CommentWrap>
    </>
  );
};

// styled-components
const DetailTop = styled.div`
  margin: 30px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .postTitle {
    font-size: 40px;
    font-weight: 500;
  }
  .btnWrap {
    display: flex;
    gap: 10px;
  }
`;
const PostImg = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: #d1d1d1;
`;
const PostContent = styled.div`
  width: 100%;
  .postDesc {
    font-size: 20px;
    line-height: 27px;
    word-break: break-all;
  }
`;
const CommentWrap = styled.div`
  width: 100%;
`;
const CommentInputWrap = styled.div`
  margin: 20px 0;
  .commentInputTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .commentInputTop div {
    font-size: 20px;
  }
  .commentInputTop div span {
    font-size: 15px;
  }
  textarea {
    resize: none;
    width: 98%;
    padding: 10px;
    height: 150px;
    font-size: 18px;
    outline-color: #9c88ff;
    border: 1px solid #9c88ff;
    border-radius: 10px;
  }
`;
const CommentsWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  min-height: 100px;
  display: flex;
  border-bottom: 1px solid rgb(217, 217, 217);
  &:last-child {
    border: none;
  }
`;
const CommentLeft = styled.div`
  width: 200px;
  .commentNickname {
    margin-bottom: 10px;
  }
  .commentBtnWrap {
    display: flex;
  }
`;
const CommentRight = styled.div`
  line-height: 24px;
  width: 100%;
  .commentDesc {
    display: ${({ inputActive }) => (inputActive ? "none" : "block")};
  }
  .commentInput {
    display: ${({ inputActive }) => (inputActive ? "block" : "none")};
    width: 98%;
    resize: none;
    height: 60%;
    padding: 10px;
    border-radius: 10px;
  }
`;

export default DetailPage;
