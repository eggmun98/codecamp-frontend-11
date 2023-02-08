export default function BoardComponent(props) {
  // 주로 사용하는 방법은 props.isEdit ? "수정" : "등록" 이 방식을 많이 쓴다. 밑에 props.name은 잘 안씀
  // 이렇게 하나의 컴포넌트로 두 페이지에게 쓸수 있다.
  return (
    <div>
      <h1>{props.isEdit ? "수정" : "등록"}페이지</h1>
      제목: <input type="text"></input>
      내용 <input type="text"></input>
      <button>{props.name}하기</button>
    </div>
  );
}
