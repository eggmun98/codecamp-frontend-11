import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import { Rate } from "antd";

//댓글창
export const CommentWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 20px;

  /* padding-top: 40px; */
  border-top: 1px solid #bdbdbd;
  /* overflow: hidden; */
  background-color: white;
  color: black;
  border-radius: 10px;
`;

// 댓글 작성칸
export const CommentTopWrapper = styled.div``;

export const CommentTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 40px;
`;

export const CommentTitleImg = styled.img`
  padding-right: 14px;
`;

export const CommentTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

// 댓그 작성자 비번칸
export const CommentWriterBox = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`;

export const CommentWriter = styled.input`
  width: 180px;
  height: 52px;
  border: 1px solid #bdbdbd;
  margin-right: 24px;
  padding-left: 20px;
`;

export const CommentPassword = styled.input`
  width: 180px;
  height: 52px;
  border: 1px solid #bdbdbd;
  padding-left: 20px;
`;

export const CommentStar = styled.button``;

// 댓글 내용작성칸
export const CommentContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 1200px;
  height: 161px;
`;

export const CommentContent = styled.input`
  width: 1200px;
  height: 108px;
  border: none;
  outline: none;
  border-top: 1px solid #bdbdbd;
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
  /* border-bottom: 1px solid red; */
`;

export const CommentContentButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
`;

export const CommentContentWriterNumber = styled.div`
  width: 1109px;
  border-top: 1px solid #f2f2f2;
  border-left: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  flex-direction: row;
`;

export const NumberText = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #bdbdbd;
`;

export const CommentContentButton = styled.button`
  width: 91px;
  border: none;
  background: #000000;
  font-weight: 500;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

//

//

//

//

// 댓글 목록칸
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  border-bottom: 1px solid #bdbdbd;
`;

export const ListProfileWrapper = styled.div`
  margin-right: 16px;
`;

export const ListProfile = styled.img``;

export const ListRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListWriterWrapper = styled.div`
  width: 1144px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;
export const ListWriter = styled.div``;

export const ListStar = styled(Rate)`
  margin-right: 900px;
`;

export const ListUpdateButton = styled.button`
  width: 18px;
  height: 18px;
  margin-right: 16px;
  background-image: url("/update.png");
  border: none;
  background-color: white;
  cursor: pointer;
`;

export const ListDeleteButton = styled.button`
  width: 14px;
  height: 14px;
  background-image: url("/delete.png");
  border: none;
  background-color: white;
  cursor: pointer;
`;

export const ListContent = styled.div`
  width: 1200px;
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  color: #4f4f4f;
  margin-bottom: 20px;
`;

export const ListDate = styled.div`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 12px;
  color: #bdbdbd;
`;
