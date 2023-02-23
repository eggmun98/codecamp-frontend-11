import styled from "@emotion/styled";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export const MainWrapper = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
`;

export const SubWrapper = styled.div`
  width: 100%;
  border: 5px solid #489bb0;
  border-radius: 10px;
  padding: 3%;
  background-color: white;
`;

export const InputStyle01 = styled.input`
  width: 100%;
  height: 50px;
  border: 2.5px solid #489bb0;
  border-radius: 10px;
  padding-left: 10px;
  outline-color: #489bb0;
  margin-bottom: 1%;
`;

export const ReactQuill2 = styled(ReactQuill)`
  border-radius: 20px;
  border: 2.5px solid #489bb0;
  .ql-toolbar.ql-snow {
    border: none;
  }

  .ql-container.ql-snow {
    border: none;
  }
`;
