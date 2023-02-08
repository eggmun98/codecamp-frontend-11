import styled from "@emotion/styled";

export const ListButton = styled.button`
  border: none;
  background-color: #282424;
  color: white;
  margin: 10px;
  color: ${(props) => (props.isActive ? "#8f3636" : "white")};
`;

export const ListNextButton = styled.button`
  border: none;
  background-color: #282424;
  color: white;
  margin: 10px;
  font-weight: 700;
`;
