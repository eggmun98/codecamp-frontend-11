import styled from "@emotion/styled";

export const Wrapper = styled.div`
  /* width: 1920px;  */
  width: 95%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

export const MainTalbe = styled.table`
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  border-collapse: collapse;
  width: 1200px;
  text-align: center;
`;

export const TableHead = styled.th`
  border-bottom: 1px solid #bdbdbd;
  color: white;
  height: 52px;
`;

export const TableData = styled.td`
  border-bottom: 1px solid #bdbdbd;
  color: white;
  height: 52px;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

// export const ListButton = styled.button`
//   border: none;
//   background-color: white;
//   margin: 10px;
// `;

// export const ListNextButton = styled.button`
//   border: none;
//   background-color: white;
//   margin: 10px;
//   font-weight: 700;
// `;

export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 40px;
`;

export const WriterButton = styled.button`
  width: 171px;
  height: 52px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
`;
