import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMoveToPageMode } from "../../hooks/customs/useMoveToPageMode";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: #489bb0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  height: 35px;
  /* background-color: rgba(49, 49, 49, 0.1);  */
  background-color: #489bb0;
  font-size: 15px;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(49, 49, 49, 0.1);
    width: 200px;
    height: 35px;
  }
`;

export default function SideBarPage() {
  const { onClickMoveToPage } = useMoveToPageMode();
  return (
    <>
      <Wrapper>
        {/* <Button onClick={onClickMoveToPage("/boads/new")}>새글 작성</Button>  */}
        <Link href={"/boards/new/"}>
          <a>새글 작성</a>
        </Link>
        {/* <Button onClick={onClickMoveToPage("/notice/writer")}>공지 사항</Button>  */}
        <Link href={"/notice/writer"}>
          <a>공지사항</a>
        </Link>
        <Button>인기 게시글</Button>
        <Button>즐겨 찾기</Button>
        {/* <Button onClick={onClickMoveToPage("/boards")}>자유 게시판</Button> */}
        <Link href={"/boards"}>
          <a>자유 게시판</a>
        </Link>
        {/* <Button onClick={onClickMoveToPage("/boards")}>중고 마켓</Button> */}
        <Link href={"/markets"}>
          <a>중고 마켓</a>
        </Link>
        {/* <Button onClick={onClickMoveToPage("/mypage")}>마이페이지</Button> */}
        <Link href={"/mypage"}>
          <a>마이페이지</a>
        </Link>
      </Wrapper>
    </>
  );
}
