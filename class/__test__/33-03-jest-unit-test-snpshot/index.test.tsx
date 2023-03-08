import { render } from "@testing-library/react"; // 랜더를 쓰기위해 임포트
import "@testing-library/jest-dom"; // 돔을 만들고
import JestUnitTestPage from "../../pages/section33/33-03-jest-unit-test-snapshot";

it("기존 사진이랑 바뀐게 없는지 비교해보자!! - 스냅샷 테스트", () => {
  const result = render(<JestUnitTestPage></JestUnitTestPage>);
  expect(result.container).toMatchSnapshot();
});
