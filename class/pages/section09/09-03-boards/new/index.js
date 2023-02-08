import BoardWrite from "../../../../src/commons/components/units/board/09-write/BoardWrite.container";

export default function GraphqlMutationPage() {
  // 한 줄일때는 괄호() 필요 없음

  return (
    <div>
      <div>####### 여기는 페이지 입니다.#######</div>
      <BoardWrite isEdit={false}></BoardWrite>;
      <div>################## 여기는 페이지 입니다.########</div>
    </div>
  );
}
