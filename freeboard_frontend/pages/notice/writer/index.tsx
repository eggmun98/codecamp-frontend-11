import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";

import { firebaseApp } from "../../../src/commons/libraries/firebase";

export default function NoticeWriterPage() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onClickCreateButton = () => {
    const board = collection(getFirestore(firebaseApp), "myboard");

    void addDoc(board, {
      writer: writer,
      title: title,
      contents: contents,
    });
    alert("글을 작성하였습니다!");
    console.log("board이다이다", board);
  };
  return (
    <>
      작성자: <input onChange={onChangeWriter}></input>
      제목: <input onChange={onChangeTitle}></input>
      내용: <input onChange={onChangeContents}></input>
      <button onClick={onClickCreateButton}>작성하기</button>
    </>
  );
}
