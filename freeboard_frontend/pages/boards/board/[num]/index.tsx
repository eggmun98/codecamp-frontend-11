import BoardDetailPage from "../../../../src/components/units/board/detail/BoardDetail.container";
import BoardCommentPage from "../../../../src/components/units/boardComment/BoardComment.container";

export default function SubPage() {
  return (
    <>
      <BoardDetailPage></BoardDetailPage>
      <BoardCommentPage></BoardCommentPage>
    </>
  );
}
