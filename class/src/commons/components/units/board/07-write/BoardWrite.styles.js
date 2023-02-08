import styled from "@emotion/styled";

export const RedInput = styled.input`
  border-color: red;
`;

export const BlueButton = styled.button`
  /* background-color: ${(props) => props.mycolor}; 
  */
  background-color: ${(props) => (props.isActive === true ? "yellow" : "")};
`;

// export const TestButton = styled.button`
//   background-color: ${(props) => (props.isActive === false ? "red" : "")};
// `;

// export const AbcButton = styled.button`
//   color: ${(props) => props.isActive === false ? "red" : "blue"};

// `

// export const a = styled.div`
// background-color: ${(props) => props.isActive === true ? "red" : : blue};
// `
