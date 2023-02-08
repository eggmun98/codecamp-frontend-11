import styled from "@emotion/styled";

export const MainInput = styled.input`
  border-color: orange;
`;
export const MainButton = styled.button`
  background-color: ${(props) => (props.isActive === true ? "yellow" : "")};
`;
