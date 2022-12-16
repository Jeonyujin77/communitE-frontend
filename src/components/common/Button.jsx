import { Colors } from "../../styles";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ children, btnTheme, onClick }) => {
  return (
    <StyledButton btnTheme={btnTheme} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  btnTheme: PropTypes.oneOf(["primary", "secondary"]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  btnTheme: "primary",
};

const StyledButton = styled.button`
  padding: 6px 22px 6px 22px;
  cursor: pointer;
  font-weight: 700;
  border-radius: 6px;
  border: 1px solid ${Colors.black};
  color: ${(props) => (props.btnTheme === "primary" ? "white" : Colors.purple)};
  background-color: ${(props) =>
    props.btnTheme === "primary" ? Colors.purple : "#FFFFFF"};
  :hover {
    opacity: 0.75;
  }
`;

export default Button;
