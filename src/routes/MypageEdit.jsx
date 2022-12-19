import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import useInput from "../hooks/useInput";
import { __getUserInfo, __modifyUserInfo } from "../lib/userApi";

const MypageEdit = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // 사용자정보 가져오기
  const dispatch = useDispatch();
  const [nickname, setNickname, nicknameHandler] = useInput(user?.nickname);
  const [imgUrl, setImgUrl] = useState(user?.image);
  const [imgData, setImgData] = useState(null); // image data

  useEffect(() => {
    dispatch(__getUserInfo(user?.userId));
  }, []);

  if (!user) {
    return <></>;
  }

  // 이미지 미리보기, blob데이터를 state에 저장
  const writeImgUrl = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      setImgData(file);
    }
  };

  // 파일 삭제
  const onFileRemove = (event) => {
    setImgUrl(null);
    setImgData(null);
    document.getElementById("profileImg").value = "";
  };

  // 프로필 수정
  const onSubmit = (event) => {
    event.preventDefault();
    //formData 형식으로 보냄
    const userId = user.userId;
    const formData = new FormData();

    if (imgData !== null) {
      formData.append("image", imgData);
    } else {
      formData.append("image", imgUrl);
    }
    formData.append("nickname", nickname);

    dispatch(__modifyUserInfo({ userId, formData })).then((res) => {
      const { type, payload } = res;
      // 응답이 정상이면
      if (type === "modifyUserInfo/fulfilled") {
        alert(`${payload.message}`);
        navigate("/");
      }
    });
  };

  return (
    <Section>
      <MypageEditWrapper>
        <h2>프로필 수정</h2>
        <form onSubmit={onSubmit}>
          <Row>
            {imgUrl !== null ? (
              <img id="preview" alt="미리보기" src={imgUrl} width="100px" />
            ) : (
              ""
            )}
          </Row>
          <Row>
            <Input
              id="profileImg"
              type="file"
              accept="image/jpg"
              width="350px"
              onChange={writeImgUrl}
            />
            <FileRemove onClick={onFileRemove}>파일삭제</FileRemove>
            <MessageBox>프로필 이미지 사진을 첨부해주세요</MessageBox>
          </Row>
          <Row>
            <Input
              type="text"
              width="350px"
              value={nickname}
              onChange={nicknameHandler}
              required
            />

            <Button btnTheme="secondary" width="80px" height="30px">
              중복확인
            </Button>
            <MessageBox>닉네임을 입력해주세요</MessageBox>
          </Row>
          <ButtonWrapper>
            <Button width="100px" height="30px" type="submit">
              수정하기
            </Button>
          </ButtonWrapper>
        </form>
      </MypageEditWrapper>
    </Section>
  );
};

const MypageEditWrapper = styled.div`
  margin: 50px auto;
  width: 480px;
`;

const Row = styled.div`
  margin: 10px 0;

  Button {
    margin-left: 5px;
  }
`;

const MessageBox = styled.p`
  font-size: 13px;
  margin: 15px 0;
  color: ${(props) => props.color || "#7f8fa6"};
  text-align: left;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  Button {
    margin-top: 50px;
  }
`;

const FileRemove = styled.span`
  display: inline-block;
  width: 80px;
  height: 30px;
  text-align: center;
  color: tomato;
  cursor: pointer;
`;

export default MypageEdit;
