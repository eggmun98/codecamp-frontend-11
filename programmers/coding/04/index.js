function solution(n, m) {
  let answer = [];
  let a = [];
  let b = [];
  let c = [];
  let d = [];
  for (let i = 1; i < 499; i++) {
    a.push(n * i);
    b.push(m * i);
    c.push(n / i);
    d.push(m / i);
  }
  answer[1] = a.filter((it) => b.includes(it))[0];
  answer[0] = c.filter((it) => d.includes(it))[0];

  return answer;
}
