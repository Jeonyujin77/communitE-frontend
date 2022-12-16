import React from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";

const Demo = () => {
  return (
    <div>
      <h2>Demo</h2>
      <h3>Button</h3>
      <Button>Primary 버튼</Button>
      <Button btnTheme="secondary">Secondary 버튼</Button>
      <hr />
      <h3>Input</h3>
      <Input type="text" />
      <Input type="password" />
      <hr />
      <Modal
        visible={false}
        title="Demo"
        children={
          <>
            <p>hello</p>
          </>
        }
        onClose
      />
    </div>
  );
};

export default Demo;
