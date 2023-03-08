import JestUnitTestPage from "../../pages/section33/33-02-jest-unit-test";
import { render, screen } from "@testing-library/react"; // 랜더를 쓰기위해 임포트
import "@testing-library/jest-dom"; // 돔을 만들고

it("내가 원하는대로 그려지는지 테스트하기", () => {
  render(<JestUnitTestPage></JestUnitTestPage>);

  const myText = screen.getByText("철수는 13살 입니다.");
  expect(myText).toBeInTheDocument(); // myText가 돔안에 있는지 테스트

  const myText2 = screen.getByText("철수의 취미 입력하기:");
  expect(myText2).toBeInTheDocument(); // myText가 돔안에 있는지 테스트

  const myText3 = screen.getByText("철수랑 놀러가기");
  expect(myText3).toBeInTheDocument(); // myText가 돔안에 있는지 테스트
});
