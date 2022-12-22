import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "../../node_modules/react-redux/es/exports";
import {
  useNavigate,
  useParams,
} from "../../node_modules/react-router-dom/dist/index";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";
import api from "../lib/api";
import { __putPostData } from "../redux/modules/postSlice";

const WritePage = () => {
  const params = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 제목, 내용 길이 제한 || 이미지 용량, 형식 제한
  const titleLength = 50;
  const ImgVolume = 5000000;
  const imgType = ["image/jpg", "image/jpeg", "image/png"];

  //제목, 내용 state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [usersId, setUsersId] = useState("");

  //error 메시지 state
  const [errorMessage, setErrorMessage] = useState("");

  //image 관련 state
  const [imgUrl, setImgUrl] = useState("");
  const [imgData, setImgData] = useState("");

  // ------------------------------------------------------------------
  //params를 통해 초기값을 가져옴
  const getPostedData = async () => {
    try {
      const {
        data: { post },
      } = await api.get(`/api/posts/${params}`);
      setTitle(post.title);
      setDesc(post.content);
      setImgUrl(post.image);
      setUsersId(post.userId);
    } catch (err) {
      if (err.response.status === 404) {
        alert("존재하지 않는 파일입니다.");
        navigate("/");
      }
    }
  };

  //params가 allposts에 없으면 mainPage로 리다이렉트, 있으면 post정보를 가져옴
  useEffect(() => {
    if (params) {
      getPostedData();
    }
  }, []);
  // ------------------------------------------------------------------
  //제목, 내용 작성
  const writeTitle = ({ target: { value } }) => {
    setTitle(value);
  };
  const writeDesc = ({ target: { value } }) => {
    setDesc(value);
  };

  // 이미지 미리보기, blob데이터를 state에 저장
  const writeImgUrl = ({ target: { files } }) => {
    if (!files[0]) {
      return;
    } else if (!imgType.includes(files[0].type)) {
      alert("파일 형식이 잘못되었습니다.");
    } else if (files[0].size > ImgVolume) {
      alert("이미지파일의 최대 용량을 초과하였습니다.");
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onloadend = () => {
        setImgUrl(fileReader.result);
      };
      setImgData(files[0]);
    }
  };
  // 원치 않는 이미지일 경우 지우는 작업
  const imgRemove = () => {
    setImgUrl("");
    setImgData("removed");
  };
  //submit
  const postSubmit = async () => {
    if (!title) {
      setErrorMessage("제목을 입력해 주세요.");
    } else if (!desc) {
      setErrorMessage("내용을 입력해 주세요.");
    } else {
      //formData 형식으로 보냄
      const formData = new FormData();

      //data append
      if (imgData === "removed") {
        formData.append("image", null);
      } else if (imgData !== "") {
        formData.append("image", imgData);
      }
      formData.append("title", title);
      formData.append("content", desc);

      if (params) {
        if (window.confirm("수정하시겠습니까?")) {
          // params가 있을 경우 put 요청 후 해당 페이지로 이동
          dispatch(__putPostData({ params: params, formData: formData }));

          navigate(`/post/${params}`);
        }
      } else {
        if (window.confirm("등록하시겠습니까?")) {
          // 없으면 post 요청 후 메인 페이지로 이동
          // dispatch(__postPostData(formData));
          await api.post(`/api/posts`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              accept: "multipart/form-data,",
            },
          });

          navigate("/");
        }
      }
    }
  };

  // 에러 메시지 초기화
  const errRemove = () => {
    setErrorMessage("");
  };
  // ----------------------------------------------------------------------
  //url로 입장해도 token 검사를 실행하여, 로그인이 안되어있으면 다시 메인 페이지로 리다이렉트
  useEffect(() => {
    //토큰으로 로그인 유무 판단
    const is_token = localStorage.getItem("accessToken");
    if (!is_token) {
      navigate("/");
    }
    if (usersId) {
      if (usersId.toString() !== localStorage.getItem("userId")) {
        navigate("/");
      }
    }
  }, [usersId]);
  return (
    <>
      <Section>
        {params ? (
          <WriteTdp>게시물 수정하기</WriteTdp>
        ) : (
          <WriteTdp>게시물 작성하기</WriteTdp>
        )}
      </Section>
      <WriteWrap>
        <label>제목</label>
        <input
          maxLength={titleLength}
          onChange={writeTitle}
          onFocus={errRemove}
          value={title}
        />
        <ul className="inputExplain">
          <li>제목은 1자 이상, {titleLength}자 이하로 입력해 주세요.</li>
          <li>
            적절하지 않다고 판단되는 비속어, 성적인 컨텐츠 등이 있을 경우,
            게시물이 삭제될 수 있습니다.
          </li>
        </ul>
      </WriteWrap>
      <WriteWrap>
        <label>내용</label>
        <textarea
          onChange={writeDesc}
          onFocus={errRemove}
          value={desc}
        ></textarea>
        <ul className="inputExplain">
          <li>내용은 1자 이상 입력해 주세요.</li>
          <li>
            적절하지 않다고 판단되는 비속어, 성적인 컨텐츠 등이 있을 경우,
            게시물이 삭제될 수 있습니다.
          </li>
        </ul>
      </WriteWrap>
      <WriteWrap thumnail={imgUrl}>
        <label>이미지</label>
        <div className="WriteImgWrap">
          <div className="WriteImg"></div>
          <label className="WriteImgBtn" htmlFor="postImg">
            add
          </label>
          <input
            id={"postImg"}
            type={"file"}
            accept={imgType.join(", ")}
            onChange={writeImgUrl}
          />
        </div>
        <Button
          onClick={imgRemove}
          width={"100px"}
          height={"40px"}
          fontSize={"18px"}
        >
          remove
        </Button>
        <ul className="inputExplain">
          <li>
            이미지의 용량은 {ImgVolume / 1000000}MB 이하로 업로드 해주세요.{" "}
          </li>
          <li>
            적절하지 않다고 판단되는 비속어, 성적인 컨텐츠 등이 있을 경우,
            게시물이 삭제될 수 있습니다.
          </li>
        </ul>
      </WriteWrap>
      <Section>
        <SubmitContainer>
          <div className="errorMessage">{errorMessage}</div>
          <Button
            onClick={postSubmit}
            width={"100%"}
            height={"50px"}
            fontSize={"20px"}
          >
            작성하기
          </Button>
        </SubmitContainer>
      </Section>
    </>
  );
};

// styled-component
const WriteTdp = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const WriteWrap = styled.div`
  margin-bottom: 40px;
  label {
    font-size: 20px;
    margin-bottom: 20px;
    display: block;
  }
  input {
    width: 500px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #9c88ff;
    padding: 10px;
    outline: none;
    font-size: 20px;
  }
  input[type="file"] {
    display: none;
  }
  textarea {
    resize: none;
    width: 98%;
    height: 200px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #9c88ff;
    outline-color: #9c88ff;
    font-size: 20px;
  }
  .inputExplain {
    padding: 0;
    list-style: none;
    font-size: 12px;
    margin: 10px 0;
  }
  .WriteImgWrap {
    position: relative;
    margin-bottom: 30px;
  }
  .WriteImg {
    width: 200px;
    height: 200px;
    background-color: gray;
    background-image: Url(${({ thumnail }) => thumnail});
    background-size: cover;
    background-position: center;

    border: 2px solid white;
    border-radius: 10px;
    box-shadow: 2px 2px 5px 2px #8080806c;
  }
  .WriteImgBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 1px solid #9c88ff;
    background-color: #9c88ff;
    color: white;
    font-size: 17px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    position: absolute;
    left: 165px;
    bottom: -30px;
    z-index: 50;
    border-radius: 50px;
    box-shadow: 0 0 5px 1px #8080806c;
  }
`;
const SubmitContainer = styled.div`
  position: relative;
  .errorMessage {
    position: absolute;
    left: 50%;
    top: -50px;
    transform: translateX(-50%);
    color: #c53a3a;
  }
`;
export default WritePage;
