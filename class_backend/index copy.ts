// const qqq: string = "안녕하세요!!";
// console.log(qqq); // 연습으로 했던거!

// 기존에는 이렇게 했음
// 1. 타입스크립트 설치
// 2. tsconfig.json 설정만들기
// 3. next가 얀 데브 실행시키면 자동으로 설정 해줬음
// 4. 하지만 노드는 직접 해야하는데 타입스크립트 홈페이지가면 방법나와있음

// 지금 이상태에서는 실행이 안될거임
// 그래서 방법으로는
// 1. 타입스크립트 => 자바스크립트로 변경
// 2. 타입스크립트를 실행시키는 프로그램을 다운받는다. // ts-node // 노드는 컴퓨터 전체에 깔려있고 ts노드는 프로젝트에만 깔려 있끼 떄문에 ts노드는 실행이 안됨
// 3. 그래서 ts노드를 컴퓨터 전체에 깔거나 패키지제이슨에서 스크립트를 이용하여 명령어를 만드는 방법이 있음!

import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);

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
  })
  .catch((error) => {
    console.log("DB 접속에 실패하였습니다.");
    console.log("원인: ", error);
  });
