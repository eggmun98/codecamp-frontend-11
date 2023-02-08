function solution(n) {
  var answer = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      answer = answer + i;
    }
  }
  return answer;
}

function solution(n) {
  var answer = n;
  for (let i = 1; i <= n / 2; i++) {
    // 약수는 자기의값 나누기 2하고 나서 그 이후는 약수가 아니기 때문에 나눠주면 3000번 돌릴꺼 1500번 돌림 즉
    // n이 12면 나누기 2해서 6인데 6이후의 숫자는 약수가 없음
    if (n % i === 0) {
      answer = answer + i;
    }
  }
  return answer;
}
