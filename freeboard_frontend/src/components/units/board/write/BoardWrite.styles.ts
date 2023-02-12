import styled from "@emotion/styled";
import { Button, Modal } from "antd";

export const Wrapper = styled.div`
  margin: 20px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  /* align-items: center;  */
  padding-left: 102px;
  padding-right: 102px;
  padding-top: 60px;
  padding-bottom: 100px;
  border: 10px solid black;
  border: none;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  color: black;
  background-color: white;
  /* border: 3px solid #8f3636;  */
  border-radius: 10px;

  /* font-family: Arial, Helvetica, sans-serif;  */
`;

// 공용 스타일
export const Label = styled.div`
  /* font-family: Arial, Helvetica, sans-serif; */
  font-weight: 500;
  font-size: 16px;
  padding-bottom: 16px;
`;

export const ErrorText = styled.div`
  padding-top: 5px;
  font-size: 10px;
  height: 15px;
  color: red;
`;

// 제목칸
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 36px;
  padding-bottom: 80px;
`;

// 작성자칸, 패스워드칸
export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 40px;
`;

export const LeftBox = styled.div`
  padding-right: 24px;
`;

export const MainLabel = styled.div`
  font-weight: 500;
  font-size: 16px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-bottom: 16px;
`;

export const Writer = styled.input`
  width: 486px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const RightBox = styled.div``;

export const Password = styled.input`
  width: 486px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

// 제목칸
export const SubJectWrapper = styled.div`
  padding-bottom: 40px;
`;

export const SubJect = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

// 내용칸
export const ContentsWrapper = styled.div`
  padding-bottom: 16px;
`;

export const Contents = styled.input`
  width: 996px;
  height: 480px;
  padding-left: 16px;
  padding: 14px;
  border: 1px solid #bdbdbd;
`;

// 주소칸
export const AddressWrapper = styled.div`
  padding-bottom: 40px;
`;

export const PostalCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`;

export const PostalCode = styled.input`
  width: 77px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
  margin-right: 16px;
`;

export const PostalCodeButton = styled(Button)`
  width: 124px;
  height: 52px;
  background-color: black;
  border: none;
  cursor: pointer;
  color: white;
`;

export const PostalCodeMain = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
  margin-bottom: 30px;
`;

export const PostalCodeSub = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const YoutubeWrapper = styled.div`
  padding-bottom: 40px;
`;

export const Youtube = styled.input`
  width: 996px;
  height: 45.78px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const ImageWrapper = styled.div`
  padding-bottom: 40px;
`;

export const UploadButton = styled.button`
  width: 78px;
  height: 78px;
  background: #bdbdbd;
  border: none;
  margin-right: 24px;
  cursor: pointer;
`;

export const OptionWrapper = styled.div`
  padding-bottom: 80px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 16px;
`;

export const RadioButton = styled.input`
  margin-right: 10px;
  accent-color: #ffd600;
  cursor: pointer;
`;

export const RadioLabel = styled.div`
  padding-right: 22px;
  cursor: pointer;
`;

export const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  width: 179px;
  height: 52px;
  background: #ffd600;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
`;
