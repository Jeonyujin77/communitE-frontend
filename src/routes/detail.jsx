import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";
import {
  useNavigate,
  useParams,
} from "../../node_modules/react-router-dom/dist/index";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";
import useAuth from "../hooks/useAuth";
import {
  __deleteCommentsData,
  __getCommentsData,
  __postCommentsData,
  __putCommentsData,
} from "../redux/modules/commentSlice";
import { __deletePostData, __getPostData } from "../redux/modules/postSlice";

const CommentToggle = ({ desc, inputActive, inputValueState }) => {
  const [inputValue, setInputValue] = inputValueState;

  useEffect(() => {
    setInputValue(desc);
  }, []);

  const writeComment = ({ target: { value } }) => {
    setInputValue(value);
  };
  const [textRows, setTextRows] = useState(1);

  useEffect(() => {
    setTextRows(inputValue.split("\n").length + 2);
  });

  return (
    <CommentRight inputActive={inputActive}>
      <div className="commentDesc">{desc}</div>
      <textarea
        type="text"
        className="commentInput"
        value={inputValue}
        onChange={writeComment}
        rows={textRows}
      ></textarea>
    </CommentRight>
  );
};
const CommentComponent = ({
  list: { commentId, nickname, content, userId, createdAt },
  params,
}) => {
  const dispatch = useDispatch();
  const [inputActive, setInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // commentDesc창 토글
  const commentToggle = () => {
    setInputActive(!inputActive);
  };
  // 댓글 삭제
  const commentDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(__deleteCommentsData({ params: params, commentId: commentId }));
    }
  };
  // 댓글 수정
  const commentRetouch = async () => {
    if (inputValue === "") {
      alert("1자 이상 입력해 주세요.");
    } else {
      if (window.confirm("수정하사겠습니까?")) {
        const retouchedComment = {
          content: inputValue,
        };

        dispatch(
          __putCommentsData({
            params: params,
            commentId: commentId,
            retouchedComment: retouchedComment,
          })
        );
        setInputActive(!inputActive);
      }
    }
  };
  return (
    <>
      <CommentsWrap>
        <CommentLeft userId={userId}>
          <div className="commentNickname">{nickname}</div>
          <div className="commentCreated">{createdAt}</div>
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
        <CommentToggle
          desc={content}
          inputValueState={[inputValue, setInputValue]}
          inputActive={inputActive}
        />
      </CommentsWrap>
    </>
  );
};
const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams().id;

  const [fullView, setFullView] = useState(false);

  //redux에 저장된 상세페이지 데이터 소환
  const post = useSelector((state) => state.posts.post);

  // 로그인 확인
  useAuth();

  // 렌더링 시 데이터 조회
  useEffect(() => {
    dispatch(__getPostData(params));
  }, [dispatch]);

  //이미지 클릭 시 토글
  const FullViewToggle = () => {
    setFullView(!fullView);
  };
  // 수정 버튼 클릭 시 페이지 이동
  const goToEdit = () => {
    navigate(`/edit/${params}`);
  };
  //게시글 삭제
  const postDelete = async () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      dispatch(__deletePostData(params));
      navigate("/");
    }
  };
  // --------------------------------------------------------------------
  const [wroteComment, setwroteComment] = useState("");

  //댓글 리스트
  const commentListed = useSelector((state) => state.comments.comments);

  // 댓글 리스트 불러오기
  useEffect(() => {
    dispatch(__getCommentsData(params));
  }, [dispatch]);

  //최신순 정리
  let commentList = [...commentListed];
  commentList = [...commentList.sort((a, b) => b.commentId - a.commentId)];

  //댓글 작성
  const setCommentDesc = ({ target: { value } }) => {
    setwroteComment(value);
  };

  // 댓글 등록
  const isLogined = document.cookie;
  const commentPost = async () => {
    //넣을 새 댓글
    if (!isLogined) {
      alert("댓글을 입력하시려면 로그인을 해주세요.");
    } else if (!wroteComment) {
      alert("댓글을 입력해주세요.");
    } else {
      const newComment = {
        content: wroteComment,
      };
      dispatch(__postCommentsData({ params: params, newComment: newComment }));
      setwroteComment("");
    }
  };

  const [areaDisabled, setAreaDisabled] = useState(false);
  const [explainPlaceHolder, setExplainPlaceHolder] =
    useState("댓글을 입력해주세요.");
  useEffect(() => {
    if (!isLogined) {
      setAreaDisabled(true);
      setExplainPlaceHolder("로그인이 필요합니다.");
    } else {
      setAreaDisabled(false);
      setExplainPlaceHolder("댓글을 입력해주세요.");
    }
  }, []);

  return (
    <>
      <DetailTop userId={String(post.userId)}>
        <div>
          <div className="postTitle">{post.title}</div>
          <div className="postNickname">{post.nickname}</div>
          <div className="postdate">{post.createdAt}</div>
        </div>
        <div className="btnWrap">
          <Button width={"100px"} height={"40px"} onClick={goToEdit}>
            게시글 수정
          </Button>
          <Button onClick={postDelete} width={"100px"} height={"40px"}>
            게시글 삭제
          </Button>
        </div>
      </DetailTop>
      <PostImg
        mainImg={post.image}
        onClick={FullViewToggle}
        fullView={fullView}
      >
        <div className="PostImg"></div>
      </PostImg>
      <Section>
        <PostContent>
          <div className="postDesc">{post.content}</div>
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
          <textarea
            onChange={setCommentDesc}
            value={wroteComment}
            disabled={areaDisabled}
            placeholder={explainPlaceHolder}
          ></textarea>
        </CommentInputWrap>
        {commentList.length === 0 ? (
          <ZeroCommentMessage>아직 댓글이 없습니다</ZeroCommentMessage>
        ) : (
          commentList.map((list) => (
            <CommentComponent
              key={list.commentId}
              params={params}
              list={list}
            />
          ))
        )}
      </CommentWrap>
    </>
  );
};

// styled-components
const DetailTop = styled.div`
  margin: 30px 0 10px;
  display: flex;
  justify-content: space-between;
  .postTitle {
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .postNickname {
    color: #4e4e4e;
    margin-bottom: 10px;
  }
  .postdate {
    color: gray;
  }
  .btnWrap {
    display: ${({ userId }) =>
      userId === localStorage.getItem("userId") ? "flex" : "none"};
    gap: 10px;
  }
`;
const PostImg = styled.div`
  width: 100%;
  height: 500px;
  margin: 0 auto;
  background-color: black;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),
    Url(${({ mainImg }) => mainImg});
  background-size: 110%;
  background-position: center;

  border-radius: 10px;
  cursor: pointer;
  .PostImg {
    width: auto;
    margin: 0 auto;
    height: 100%;
    backdrop-filter: blur(10px);
    background-image: Url(${({ mainImg }) => mainImg});
    background-size: ${({ fullView }) => (fullView ? "cover" : "contain")};
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
  }
`;
const PostContent = styled.div`
  width: 100%;
  .postDesc {
    font-size: 20px;
    line-height: 27px;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;
const CommentWrap = styled.div`
  width: 100%;
  min-height: 500px;
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
const ZeroCommentMessage = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
const CommentLeft = styled.div`
  width: 200px;
  .commentNickname {
    font-weight: bold;
  }
  .commentCreated {
    font-size: 15px;
    margin-bottom: 10px;
    color: #939393;
  }
  .commentBtnWrap {
    display: ${({ userId }) =>
      String(userId) === localStorage.getItem("userId") ? "flex" : "none"};
  }
`;
const CommentRight = styled.div`
  line-height: 24px;
  width: 100%;
  margin-bottom: 10px;
  .commentDesc {
    display: ${({ inputActive }) => (inputActive ? "none" : "block")};
    white-space: pre-wrap;
    word-break: break-word;
  }
  .commentInput {
    display: ${({ inputActive }) => (inputActive ? "block" : "none")};
    width: 98%;
    font-size: 17px;
    line-height: 24px;
    resize: none;
    min-height: 60%;
    padding: 10px;
    border-radius: 10px;
  }
`;

export default DetailPage;
