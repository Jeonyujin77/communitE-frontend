import React from "react";
import styled from "styled-components";
import Header from "./Header";

const LayoutWrapper = styled.div`
  max-width: 1440px;
  min-width: 780px;
  margin: 0 auto;
`;
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  );
};

export default Layout;
