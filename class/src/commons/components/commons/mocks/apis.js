import { graphql } from "msw";

const gql = graphql.link("http://mock.com.graphql");

export const apis = [
  gql.mutation("createBoard", (req, res, ctx) => {
    const { writer, title, contents } = req.variables.createBoardInput; // req.variables.createBoardInput.writer req.variables.createBoardInput. contents req.variables.createBoardInput.title로 꺼낼 수 있음 즉 구조분해할당으로 안꺼내도됨

    return res(
      ctx.data({
        createBoard: {
          _id: "qqq",
          writer: writer, // 여기 변수들은 구조분해할당으로 가져온거임
          title: title,
          contents: contents,
          __typepname: "Board",
        },
      })
    );
  }),

  //   gql.query("fetchBoards", () => {})  //이렇게 쿼리도 작성할 수 있음!
];
