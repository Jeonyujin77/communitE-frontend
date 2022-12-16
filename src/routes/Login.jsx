import React from "react";
import styled from "styled-components";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";
import { Colors } from "../styles/colors";

const LoginWrapper = styled.div`
  border: 1px solid ${Colors.lightGrey};
  width: 400px;
  height: 400px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 5px;
`;

const LoginRow = styled.div``;

const Login = () => {
  return (
    <Section>
      <LoginWrapper>
        <h1>Communit E</h1>
        <LoginRow>
          <Input type="text" width="300px" />
        </LoginRow>
        <LoginRow>
          <Input type="password" width="300px" />
        </LoginRow>
      </LoginWrapper>
    </Section>
  );
};

export default Login;
