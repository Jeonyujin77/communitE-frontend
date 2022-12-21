import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import { __checkDuplicate, __modifyUserInfo } from "../lib/userApi";
import useAuth from "../hooks/useAuth";

const MypageEdit = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // 사용자정보 가져오기
  const [nickname, setNickname] = useState(user?.nickname); // 닉네임
  const [imgUrl, setImgUrl] = useState(user?.image); // 프로필 이미지
  const [imgData, setImgData] = useState(null); // 이미지 데이터
  const [checkNickDup, setCheckNickDup] = useState(true); // 닉네임 중복 검증

  // 로그인 확인
  useAuth();

  // 닉네임 입력 시
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    setCheckNickDup(false); // 입력 시 중복확인 false
  };

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

  // 닉네임 중복확인
  const checkDuplicate = (text) => {
    if (text === "") {
      alert("입력 후 중복확인해주세요.");
      return;
    }

    dispatch(__checkDuplicate(text)).then((res) => {
      const { type } = res;
      // 응답이 정상이면
      if (type === "checkDuplicate/fulfilled") {
        setCheckNickDup(true);
        alert("사용가능한 닉네임입니다.");
      }
    });
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

    // 닉네임 중복 확인 여부 true인 경우에만 수정한다
    if (checkNickDup) {
      dispatch(__modifyUserInfo({ userId, formData })).then((res) => {
        const { type, payload } = res;
        // 응답이 정상이면
        if (type === "modifyUserInfo/fulfilled") {
          alert(`${payload.message}`);
          window.location.href = "/";
        }
      });
    } else {
      alert("닉네임 중복확인을 해주세요.");
    }
  };

  return user ? (
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
              accept=".jpg, .png"
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
              onChange={onChangeNickname}
              required
            />

            <DupCheck onClick={() => checkDuplicate(nickname)}>
              중복확인
            </DupCheck>
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
  ) : (
    ""
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

const DupCheck = styled.span`
  display: inline-block;
  width: 80px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  color: tomato;
`;

export default MypageEdit;
