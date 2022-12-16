import Button from "./Button";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useClickAway from "../../hooks/useClickAway";

const Modal = ({ visible, title, children, onSubmit, onClose }) => {
  const { ref } = useClickAway(onClose);
  const portalDiv = document.querySelector("#modal-root");
  if (!portalDiv) {
    return null;
  }
  return (
    <>
      {visible &&
        createPortal(
          <Background visible={visible}>
            <ModalBox ref={ref}>
              <h3 style={{ textAlign: "center" }}>{title}</h3>
              <div style={{ margin: "30px 0" }}>{children}</div>
              <ButtonsBox>
                {onSubmit && <Button onClick={onSubmit}>제출하기</Button>}
                <Button btnTheme="secondary" onClick={onClose}>
                  뒤로가기
                </Button>
              </ButtonsBox>
            </ModalBox>
          </Background>,
          portalDiv
        )}
    </>
  );
};

const Background = styled.div`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: auto;
  z-index: 999;
  min-height: 100vh;
  padding-top: 12vh;
  padding-right: 15vw;
  padding-left: 15vw;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  background-color: white;
  position: relative;
  z-index: 20;
  min-height: 140px;
  max-width: 700px;
  padding: 30px 90px 30px 90px;
  margin: auto;
  border-radius: 6px;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding: 16px;
`;

export default Modal;
