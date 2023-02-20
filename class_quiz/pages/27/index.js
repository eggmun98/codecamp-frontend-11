import { gql, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuil = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function QuizePage27() {
  const router = useRouter();

  const onChangeContents = (value) => {
    console.log(value);
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  };

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const { register, setValue, trigger, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onClickSubmit = async (data) => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
    });

    router.push("/27/detail/" + result.data.createBoard._id);
    alert("보냄");
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <input type="text" {...register("writer")}></input>
      비밀번호: <input type="password" {...register("password")}></input>
      제목: <input type="text" {...register("title")}></input>
      내용: <ReactQuil onChange={onChangeContents}></ReactQuil>
      <button>등록하기</button>
    </form>
  );
}
