import { fireEvent, render, screen } from "@testing-library/react"; // 랜더를 쓰기위해 임포트
import "@testing-library/jest-dom"; // 돔을 만들고
import JestUnitTestPage from "../../pages/section33/33-04-jest-unit-test-event";

it("버튼을 눌렀을 때, 제대로 작동하는지 테스트하자!", () => {
  render(<JestUnitTestPage></JestUnitTestPage>);

  fireEvent.click(screen.getByRole("count-button")); // 롤이 count-button을 가져와서 클릭시

  expect(screen.getByRole("count")).toHaveTextContent("1"); // count를 가져와서 텍스트가 1인지
});
