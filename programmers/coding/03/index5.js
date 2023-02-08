function solution(x) {
  let answer = true;
  qqq = String(x);
  let sum = 0;
  for (let i = 0; i < qqq.length; i++) sum = sum + Number(qqq[i]);
  if (x % sum !== 0) answer = false;
  return answer;
}
