import React, { FC, useRef } from "react";
import { Form, FormControlProps } from "react-bootstrap";

export const EnterInput: FC<FormControlProps> = (props) => {
  const inputRef = useRef<any>();

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    inputRef.current.blur();
  };

  return (
    <Form.Control
      ref={inputRef}
      type={"input"}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};
