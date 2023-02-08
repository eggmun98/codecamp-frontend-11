function solution(n) {
  let answer = 0;
  let sum = String(n);
  for (let i = 0; i < sum.length; i++) {
    answer += Number(sum[i]);
  }
  return answer;
}

function solution(n) {
  let answer = 0;

  n = String(n)
    .split("")
    .forEach((el) => {
      answer += Number(el);
    });
  // 고차함수랑 함수의 리턴값을 함수로 받는다.
  // split("") 문자열을 쪼갤 수 있다.
  // forEach() 고차함수
  return answer;
}
