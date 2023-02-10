import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 15%;
  height: 1920px;
  background-color: #8f3636;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const Button = styled.button`
  /* width: 200px; */
  height: 35px;
  /* background-color: rgba(49, 49, 49, 0.1);  */
  background-color: #8f3636;
  font-size: 15px;
  color: white;
  margin-bottom: 50px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(49, 49, 49, 0.1);
    width: 200px;
    height: 35px;
  }
  /* border-radius: 5px;  */
`;

export default function SideBarPage() {
  const router = useRouter();

  const onClickMyPageButton = () => {
    router.push("/mypage");
  };

  const onClickBoardButton = () => {
    router.push("/boards");
  };

  const onClcikNewButton = () => {
    router.push("/boards/new");
  };

  return (
    <>
      <Wrapper>
        <Button onClick={onClcikNewButton}>새글 작성</Button>
        <Button>공지 사항</Button>
        <Button>인기 게시글</Button>
        <Button>즐겨 찾기</Button>
        <Button onClick={onClickBoardButton}>자유 게시판</Button>
        <Button>중고 마켓</Button>
        <Button onClick={onClickMyPageButton}>마이페이지</Button>
      </Wrapper>
    </>
  );
}
