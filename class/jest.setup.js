import { server } from "./src/commons/components/commons/mocks/index";
beforeAll(() => server.listen()); // 모두 시작하기 전에 서버를 킵니다
afterAll(() => server.close()); // 모두 테스트가 끝나면 서버 종료

// 여기서 close, listen에 빨간줄이 생기면
// eslintrc.js 파일에서 eve: 여기에서
// jest: true를 해주면 됨
