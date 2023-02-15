import { UseFormRegisterReturn } from "react-hook-form";
import styled from "@emotion/styled";

export const InputStyled01 = styled.input`
  width: 500px;
  height: 50px;
  border: 1px solid #489bb0;
  border-radius: 10px;
  padding-left: 10px;
  outline-color: #489bb0;
`;

export default function Input01(props) {
  return <InputStyled01 type={props.type} {...props.register}></InputStyled01>;
}
