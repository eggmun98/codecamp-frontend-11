import { add } from "../../pages/section33/33-01-jest";

it("더하기 잘 되는지 테스트 해보기", () => {
  const result = add(3, 5); // add를 임포트해서 가져온다!! 그리고 add에 인자값을 넣어 준다.
  expect(result).toBe(8); // result가 8이 맞니??
});

// describe("나만의 테스트 그륩 만들기", () => {
//     it("더하기 테스트", () => {

//     })
//     it("빼기 테스트", () => {

//     })

//     it("곱하기 테스트", () => {

//     })

// })
