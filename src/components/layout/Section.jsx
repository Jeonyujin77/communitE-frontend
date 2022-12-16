import PropTypes from "prop-types";
import styled from "styled-components";

const Section = ({ children }) => {
  return <DefaultSection>{children}</DefaultSection>;
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

const DefaultSection = styled.div`
  padding: 50px 0;
`;

export default Section;
