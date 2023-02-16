import { useMoveToPage } from "../../../src/commons/components/commons/\bhooks/useMoveToPage";

export default function CustomHooksUseAuthPage(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  // 페이지 이동버튼의 리팩토링!!

  return (
    <>
      <button onClick={onClickMoveToPage("/boards")}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage("/markets")}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage("/mypages")}>마이페이지로 이동</button>
    </>
  );
}

// export default 로그인체크(CustomHooksUseAuthPage)  이거 대신 사용할 수 있는게 customHooks
