import styled from "@emotion/styled";

export const MainWrapper = styled.div`
  width: 764px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: "SUIT";
  font-weight: 700;
  font-size: 14px;

  /* margin-top: 100px;
  margin-bottom: 30px;
  margin-left: 100px;
  margin-right: 100px; */
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 73px;
`;

export const TopWrapper = styled.div`
  font-size: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid #6400ff;
  margin-bottom: 30px;
`;

export const TitleWRapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const TitleText = styled.div`
  margin-right: 50px;
`;

export const Title = styled.input`
  width: 604px;
  height: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  outline-color: #6400ff;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentsText = styled.div`
  /* margin-right: 50px */
`;

export const Contents = styled.textarea`
  /* padding: 20px; */
  width: 604px;
  height: 240px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  outline-color: #6400ff;
  margin-left: 50px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const ImageText = styled.div`
  margin-right: 40px;
`;

export const Image = styled.img`
  background-image: url("/imageupload.png");
  width: 80px;
  height: 80px;
  border: none;
  margin-right: 10px;
`;

export const ImageButton = styled.input`
  width: 80px;
  height: 80px;
  display: none;
`;

export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const WriterText = styled.div`
  margin-right: 40px;
`;

export const Writer = styled.input`
  width: 242px;
  height: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-right: 20px;
  outline-color: #6400ff;
`;

export const Password = styled.input`
  width: 242px;
  height: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  outline-color: #6400ff;
`;

export const OutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 764px;
  /* margin-right: 100px; */
  margin-top: 30px;
  /* margin-right: 100px;
  margin-left: 100px; */
`;

export const BottomButtonA = styled.button`
  width: 80px;
  height: 30px;
  color: #ffffff;
  font-weight: 700;
  font-family: "SUIT";
  background: #6400ff;
  border-radius: 30px;
  padding: 5px 20px;
  border: none;
  margin-right: 5px;
`;

export const BottomButtonB = styled.button`
  width: 80px;
  height: 30px;
  color: #ffffff;
  font-weight: 700;
  font-family: "SUIT";
  background: #999999;
  border-radius: 30px;
  padding: 5px 20px;
  border: none;
  margin-left: 5px;
`;
