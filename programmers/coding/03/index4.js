function solution(s) {
  let answer = "";
  let idx = 0; // 단어별로 인덱스 값을 저장하는 역할
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      answer += " ";
      idx = 0; /// idx를 0으로 초기화
    } else {
      answer += idx % 2 === 0 ? s[i].toUpperCase() : s[i].toLowerCase();
      idx++;
    }
  }
  return answer;
}
