function solution(s) {
  if (s.length !== 4 && s.length !== 6) {
    return false; // 4글자 6글자가 아니면 적용 즉 1, 2, 3, 5, 7일 때적용
  }
  for (let i = 0; i < s.length; i++) {
    if (Number.isNaN(Number(s[i])) === true) {
      return false;
    }
  }
  return true;
}

function solution(s) {
  if (s.length !== 4 && s.length !== 6) {
    return false; // 4글자 6글자가 아니면 적용 즉 1, 2, 3, 5, 7일 때적용
  }
  const answer = s.split("").filter((el) => {
    return Number.isNaN(Number(el));
  });
  return answer.length === 0;
}
