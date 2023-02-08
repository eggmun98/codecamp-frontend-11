import { Board } from "./Board.postgres";
import { DataSource } from "typeorm";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ValuesOfCorrectTypeRule } from "graphql";

// API-DOCS 만들기 //필수 입력은  타입 오른쪽에 !낌표를 적음
const typeDefs = `#graphql
  # 인자에 들어가는 타입은 type 대신 input 적어야함
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  # 이건 parent에 들어가니까 type 적은거임
  type MyBoard {
  number: Int
  writer: String
  title: String
  contents: String
  }

  type Query {
    fetchBoards: [MyBoard] 
  }

  type Mutation {
  # 연습용(example 방식)
   # createBoard(writer: String, title: String, contents: String): String 

  # 실무용(backend-practice 방식)
    createBoard(createBoardInput: CreateBoardInput): String 

  }
`;

// API 만들기
const resolvers = {
  Query: {
    fetchBoards: async () => {
      // 1. 모두 꺼내기
      const result = await Board.find(); // 삭제한다고 치자는 것들은 isDeleted를 펄스인거만 검색하게 만들면됨
      console.log(result);

      // 2. 한개만 꺼내기 // 넘버가 3인 게시글 하나만 꺼내와서 꺼내줘!!
      // const result = await Board.findOne({ where: { number: 3 } });

      return result;
    },
  }, // 컴마가 있는 이유는 객체니까 ~~
  // 브라우저에서 요청이 들어오면 args에 들어가게 되고 데이터는 parent가 저기 패치보더 로 들어갈거임 아마도
  //
  Mutation: {
    createBoard: async (parent: any, args: any, context: any, info: any) => {
      await Board.insert({
        ...args.createBoardInput, // 아래꺼를 이렇게 줄인거임!! 스프레드 연산자를 이용해서

        // 하나 하나 모두 입력하는 비효율적인 방식
        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title, // insert는 결국에 orm으로 편하게 쓰는거!
        // contents: args.createBoardInput.contents,
      });
      return "게시글 등록에 성공했어요!!";
    },
    // 왼쪽은 조건 오른쪽은 수정할 내용 // 즉 3번 게시글을 영희로 바꿔줘
    // updateBoard: async () => {
    //   await Board.update({ number: 3 }, { writer: "영희" });
    // },

    // deleteBoard: async () => {
    //   await Board.delete({ number: 3 }); // 3번 게시글을 삭제해줘
    //   await Board.update({ number: 3 }, { isDeleted: true }); // 3번 게시글 삭제했다고 치자 왜? 나중에 복원하기 위해서 즉 트루로해서 안보이게 하는거임 // 즉 이것은 소프트 삭제라고 한다! // 단점으로는 언제 삭제했는지 모름 // 펄스이면 isDeleted가 초기값이 펄스이면? 삭제 안된거, true이면 삭제 된거
    //   await Board.update({ number: 3 }, { deletedAt: new Date() }); // deletedAt이 초기값 Null 이면? 삭제 안된거, new Date()가 들어가 있으면 삭제 된거 // 즉 위에 방법에서 업그레이드해서 삭제 날짜까지 알 수 있음!! 이것도 3번 게시글을 삭제했다고 치자 즉 소프트 삭제이다!
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: true, // 백엔드에서 콜스를 풀어주는거

  // 선택한 사이트만 cors를 풀어주고 싶을 때
  // cors: {
  //   origin: ["http://naver.com", "http://coupang.con"]
  // }
});

const AppDataSource = new DataSource({
  type: "postgres", // 무슨 데이터베이스를 쓸건지 mysql 오라클ql 등등...
  host: "34.64.244.122", // "데이터베이스 깔린 컴퓨터 IP 주소"
  port: 5009, // "데이터베이스 깔린 컴퓨터 포트"
  username: "postgres", // 아이디
  password: "postgres2022", // 비번
  database: "postgres", // postgres1, postgres2 여러개 만들어서 쓸수 있음
  entities: [Board], // 테이블 이름 적는 칸
  synchronize: true, // 테이블 만들어 줘
  logging: true, // 우리가 간단 명령어를 쓴거를 원래의 명령어를 바뀌는 것을 보여줌
});

//.댄은 성공하면
AppDataSource.initialize()
  .then(() => {
    console.log("DB접속에 성공하였습니다.");

    startStandaloneServer(server).then(() => {
      console.log("그래프큐엘 서버가 실행되었습니다."); // 포트는: 4000으로 실행 될거임!!
    });
  })
  .catch((error) => {
    console.log("DB 접속에 실패하였습니다.");
    console.log("원인: ", error);
  });
