// import ReactQuill from "react-quill"; //

import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Modal } from "antd";
import { useEffect } from "react";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
}); // ssr은 서버에서는 임폴트를 안해준다는 뜻

export default function WebEditorPage(): JSX.Element {
  // ReactQuill 만든 사람들이 만든 onChange 이므로 event는 안들어옴
  const onChangeContents = (value: string): void => {
    console.log(value);
  };

  //   const onClickSubmit = async (event): Promise<void> => {
  //     event.preventDefault(); // 이거없으면 페이지 이동이 될거임 막아주는거임 왜? 폼태그의 특성이 페이지 이동이기 때문에
  //     const { Modal } = await import("antd"); // 이렇게 하는 이유는 모달창을 쓸지 안쓸지(유저들이 등록 버튼을 누르는경우 안누를 경우가 있으니) 모르는데 미리 다운을 받아오면 첫페이지 로딩 속도가 느려지기 때문에 이 버튼을 누르면 임포트해오는 걸로 바꾸는 거임!!
  //     Modal.success({ content: "게시글 등록에 성공하였습니다.!!" });
  //   };

  useEffect(() => {
    async function aaa(): Promise<void> {
      const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
      Modal.success({ content: "게시글 등록에 성공하였습니다.!!" });
    }
    void aaa(); // 이렇게 해주는 이유는 위의 방법은 버튼을 눌러야 임폴트를 해오니 약간 느릴 수 있음 그래서 즉 첫 페이지 렌더링 후 리렌더링 할때 받아오는 방법으로 사용 할 수 있다. 근데 이건 코드가 복잡해질 수 있다는 단점이 있다!!
  }, []);

  const onClickSubmit = async (event): Promise<void> => {
    event.preventDefault();
    const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
    Modal.success({ content: "게시글 등록에 성공하였습니다.!!" });
  };

  // wrapFormAsync이거로 함수를 감싸줘야함 그래야 빨간줄 사라질거임
  return (
    <form onSubmit={onClickSubmit}>
      작성자: <input type="text"></input>
      <br />
      비밀번호: <input type="password"></input>
      <br />
      제목: <input type="text"></input>
      <br />
      {/* 내용: {process.browser ? <ReactQuill onChange={onChangeContents}></ReactQuill> : <div />}   이거는 실행이 안될거임 이거는 만약 브라우져면 ReactQuill 태그를 보여줘 브라우저가 아니라면 빈값 보여줘
      근데 실행이 안됨 왜? 임폴트 자체가 안되고 있으니까
      그래서 브라우저에 직접 임포틀 해줘야함
      브라우저에 직접 임포트 하는 방법은 다이나믹 임포트 라고 한다 */}
      내용<ReactQuill onChange={onChangeContents}></ReactQuill>
      <button>등록하기</button>
    </form>
  );
}
