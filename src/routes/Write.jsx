import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import Button from "../components/common/Button";
import Section from "../components/layout/Section";

const WritePage = () => {
  const navigate = useNavigate();

  // 제목, 내용 길이 제한 || 이미지 용량 제한
  const titleLength = 50;
  const descLength = 3000;
  const ImgVolume = "500MB";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const writeTitle = ({ target: { value } }) => {
    setTitle(value);
  };
  const writeDesc = ({ target: { value } }) => {
    setDesc(value);
  };

  const postSubmit = () => {
    if (!title) {
      setErrorMessage("제목을 입력해 주세요.");
    } else if (!desc) {
      setErrorMessage("내용을 입력해 주세요.");
    } else {
      console.log("submit");
      navigate("/");
    }
  };
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
      <WriteWrap>
        <label>이미지</label>
        <div className="WriteImgWrap">
          <div className="WriteImg"></div>
          <button className="WriteImgBtn">add</button>
        </div>
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
    border: 1px solid white;
    border-radius: 10px;
    box-shadow: 3px 3px 5px 1px #8080806c;
  }
  .WriteImgBtn {
    width: 50px;
    height: 50px;
    border: 1px solid #9c88ff;
    background-color: white;
    color: #9c88ff;
    font-size: 17px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    position: absolute;
    left: 165px;
    bottom: -15px;
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
