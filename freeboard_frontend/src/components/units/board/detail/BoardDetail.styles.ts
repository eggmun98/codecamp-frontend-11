import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import { Rate } from "antd";

//가장 바깥 웨퍼
export const OutWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 20px;

  color: black;
`;

// 안쪽을 감싸는 웨퍼
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  /* margin: 100px; */
  padding-top: 20px;
  padding-left: 102px;
  padding-right: 102px;
  padding-bottom: 80px;
  border: 1px solid black;
  border: none;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  background-color: whitesmoke;
  border-radius: 10px;

  /* font-family: Arial, Helvetica, sans-serif;  */
`;

export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 20px;
`;

//

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 64px;
`;

export const LeftBox = styled.div`
  padding-right: 12px;
`;

export const Profile = styled.img``;

export const RightBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Writer = styled.div`
  font-weight: 500;
  font-size: 24px;
`;
export const Date = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #828282;
`;

//

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const TopWrapper = styled.div`
  width: 376px;
  height: 72px;
  margin-right: 16px;
  padding: 8px 16px;
  color: white;
  background-image: url("/box.png");
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Point1 = styled.img`
  width: 26.67px;
  height: 13.33px;
`;
export const Point2 = styled.img`
  padding-left: 26.67px;
  /* width: 18.67px;
  height: 26.67px; */
`;

// 게시글 제목칸
export const SubJectWrapper = styled.div`
  padding-top: 80px;
  padding-bottom: 40px;
`;

export const SubJect = styled.div`
  font-weight: 700;
  font-size: 36px;
`;

export const ImageWrapper = styled.div`
  padding-bottom: 40px;
`;

export const ImageBox = styled.img`
  width: 996px;
  height: 480px;
`;

// 게시글 내용칸
export const ContentsWrapper = styled.div`
  padding-bottom: 120px;
`;
export const Contents = styled.div`
  font-weight: 400;
  font-size: 16px;
`;

// 게시글 유튜브칸
export const YoutubeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 160px;
`;

export const Youtube = styled(ReactPlayer)``;

export const UpDownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const UpBox = styled.div`
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const UpButton = styled.button`
  background-image: url("/up.png");
  width: 20px;
  height: 18px;
  border: none;
  background-color: transparent;
`;

export const UpText = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #ffd600;
  padding-top: 5px;
`;
export const DownBox = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DownButton = styled.button`
  background-image: url("/down.png");
  width: 20px;
  height: 18px;
  border: none;
  background-color: transparent;
`;

export const DownText = styled.div`
  font-weight: 400;
  font-size: 18px;
  padding-top: 5px;
`;

//

//

// 목록으로, 수정하기, 삭제하기
export const MiddleWrapper = styled.div`
  margin-left: 300px;
  margin-top: 50px;
`;

export const MiddleWrapperButton = styled.button`
  width: 179px;
  height: 45px;

  margin-right: 24px;
  border: 1px solid #bdbdbd;
  background-color: white;
  padding: 14px 60px;
  cursor: pointer;
`;

//

//

//

//
