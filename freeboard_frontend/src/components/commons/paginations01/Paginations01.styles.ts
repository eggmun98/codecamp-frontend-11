import styled from "@emotion/styled";

export const ListButton = styled.button`
  border: none;
  background-color: #282424;
  color: white;
  margin: 10px;
  color: ${(props) => (props.isActive ? "red" : "white")};
  cursor: pointer;
`;

export const ListNextButton = styled.button`
  border: none;
  background-color: #282424;
  color: white;
  margin: 10px;
  font-weight: 700;
  cursor: pointer;
`;
