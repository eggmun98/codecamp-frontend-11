// 1. HOF - 일반함수

function first<T>(arg1: T) {
  return function second<U>(arg2: U): [T, U] {
    return [arg1, arg2];
  };
}
// 두번째 함수의 이름은 중요하지가 않음 이름을 어짜피 안쓰니
const result = first("영희")(8);

//
//
// 2. HOF - 화살표 함수 // 화살표 함수는 어떤 조건에 맞으면 중괄호 생략하고 소괄호 가능 근데 거기서 리턴이 딱히 없으면 소괄호 생략 가능
const first2 =
  <T>(arg1: T) =>
  <U>(arg2: U): [T, U] => {
    return [arg1, arg2];
  };

const result = first2("영희")(8);

//
//
// 3
const 로그인체크 =
  <T>(Component: C) =>
  <U>(props: P): [C, P] => {
    return [Component, props];
  };

const result = 로그인체크("영희")(8);
