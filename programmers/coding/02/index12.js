function solution(n) {
  var answer = [];
  let sum = String(n);
  let b = 0;
  for (let i = sum.length - 1; i >= 0; i--) {
    b = Number(sum[i]);
    answer.push(b);
  }
  return answer;
}

function solution(n) {
  var answer = [];
  n = String(n);
  let b = 0;
  for (let i = n.length - 1; i >= 0; i--) {
    b = Number(n[i]);
    answer.push(b);
  }
  return answer;
}

function solution(n) {
  const answer = [];

  // n = String(n)
  n = n.toString();

  for (let i = n.length - 1; i >= 0; i--) {
    answer.push(Number(n[i]));
  }
  return answer;
}

function solution(n) {
  const answer = n
    .toString()
    .split("")
    .reverse()
    .map((el) => {
      return Number(el);
    }); //맵은 새로운 배열을 만듬
  console.log(answer);
}
