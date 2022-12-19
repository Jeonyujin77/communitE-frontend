import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../node_modules/axios/index";
import {
  useNavigate,
  useParams,
} from "../../node_modules/react-router-dom/dist/index";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";

const WritePage = () => {
  const params = useParams().id;
  const navigate = useNavigate();

  // 제목, 내용 길이 제한 || 이미지 용량 제한
  const titleLength = 50;
  const descLength = 3000;
  const ImgVolume = "500MB";

  //제목, 내용 state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //error 메시지 state
  const [errorMessage, setErrorMessage] = useState("");

  //image 관련 state
  const [imgUrl, setImgUrl] = useState("");
  const [imgData, setImgData] = useState("");
  // ------------------------------------------------------------------
  //params를 통해 초기값을 가져옴
  const getPostedData = async () => {
    const {
      data: { post },
    } = await axios.get(`${process.env.REACT_APP_URL}/api/posts/${params}`);
    setTitle(post.title);
    setDesc(post.content);
    setImgUrl(post.image);
  };
  //params가 들어온다면 state의 초기값을 지정
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
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onloadend = () => {
      setImgUrl(fileReader.result);
    };
    setImgData(files[0]);
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
        // params가 있을 경우 put 요청 후 해당 페이지로 이동
        await axios.put(
          `${process.env.REACT_APP_URL}/api/posts/${params}`,
          formData
        );

        navigate(`/post/${params}`);
      } else {
        // 없으면 post 요청 후 메인 페이지로 이동
        await axios.post(`${process.env.REACT_APP_URL}/api/posts`, formData);
        navigate("/");
      }
    }
  };

  // 에러 메시지 초기화
  const errRemove = () => {
    setErrorMessage("");
  };
  return (
    <>
      <Section>
        <WriteTdp>nickname님의 새로운 글입니다!</WriteTdp>
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
          maxLength={descLength}
          onChange={writeDesc}
          onFocus={errRemove}
          value={desc}
        ></textarea>
        <ul className="inputExplain">
          <li>내용은 1자 이상, {descLength}자 이하로 입력해 주세요.</li>
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
            accept="image/jpg"
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
          <li>이미지의 용량은 {ImgVolume} 이하로 업로드 해주세요. </li>
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
            등록하기
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
