import PropTypes from "prop-types";
import styled from "styled-components";

const Section = ({ children }) => {
  return <DefaultSection>{children}</DefaultSection>;
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

const DefaultSection = styled.div`
  padding: 60px 90px 60px 90px;
`;

export default Section;
