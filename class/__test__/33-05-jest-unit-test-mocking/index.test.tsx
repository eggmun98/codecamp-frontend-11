import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import StaticRoutingMovedPage from "../../pages/section33/33-05-jest-unit-test-mocking";
import fetch from "cross-fetch";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock")); // 여기에 있는건 가짜로 대체해줘 // jest에는 router가 없기 때문에
// 즉 실제로 33-05-jest-unit-test-mocking 페이지에서는 router-mock()가 router-mock로 바껴서 실행됨

// 이건 테스트 할때마다 계속 적어줘야해서 불편함 => 그래서 jest.setup.js에 이것을 잘라내기해서 붙여넣으면 여러곳에서 쓸수 있을거임
// import { server } from "../../src/commons/components/commons/mocks/index";
// beforeAll(() => server.listen()); // 모두 시작하기 전에 서버를 킵니다
// afterAll(() => server.close()); // 모두 테스트가 끝나면 서버 종료

it("게시글이 잘 등록되는지 테스트 하자!", async () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://mock.com.graphql", // 가짜 api를 만들어야함 왜? 우리 api를 이용하면 실제로 등록이 되고 한번에 몇백개 테스트하기가 어려우니까 msw를 깔아서 가짜 api 만들거임
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });
  // 1. 화면을 렌더링하고
  render(
    <ApolloProvider client={client}>
      <StaticRoutingMovedPage></StaticRoutingMovedPage>
    </ApolloProvider>
  );

  // 2. 작성자, 제목, 내용 인풋창에 값 입력
  fireEvent.change(screen.getByRole("input-writer"), {
    target: { value: "맹구" },
  });

  fireEvent.change(screen.getByRole("input-title"), {
    target: { value: "안녕하세요" },
  });

  fireEvent.change(screen.getByRole("input-contents"), {
    target: { value: "반갑습니다" },
  });

  // 3. 등록하기 버튼 클릭
  fireEvent.click(screen.getByRole("submit-button"));

  // 4. 뮤테이션 날리기(가짜 api 만들기) //  qqq에 가짜 id값도 전달해 줄거임 // 여기서는 아폴로세팅도 다시 해줘야함 아예 생코드를 가져오기 때문에

  // 5. 등록된 페이지로 이동 // router.push("/boards/qqq")
  await waitFor(() => {
    expect(mockRouter.asPath).toEqual("/boards/qqq"); // 페이지가 이동이 되었는지 확인
  });
});
