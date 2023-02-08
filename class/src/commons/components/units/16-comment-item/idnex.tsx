import { useState } from "react";

export default function CommentItem(props: any): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = (): void => {
    setIsEdit(true);
  };

  return (
    // 이러헤 컴포넌트를 나누면
    // 컴포넌트가 10개가 만들어짐
    // 무슨 컴포넌트가? 아래의 div들이
    // 그래서 독립적으로 관리가 가능함
    <div>
      {!isEdit ? (
        <div>
          <span style={{ margin: "10px" }}>{props.el.title}</span>
          <span style={{ margin: "10px" }}>{props.el.writer}</span>
          <button onClick={onClickEdit}>수정하기</button>
        </div>
      ) : (
        <input type="text" key={props.el._id}></input>
      )}
    </div>
  );
}
