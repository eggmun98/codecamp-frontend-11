import styled from "@emotion/styled";

export const Wrapper = styled.div`
  margin: 360px;
  width: 1920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
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
  color: #4f4f4f;
  height: 52px;
`;

export const TableData = styled.td`
  border-bottom: 1px solid #bdbdbd;
  color: #4f4f4f;
  height: 52px;
`;

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
