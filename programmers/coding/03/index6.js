function solution(num) {
  for (let i = 0; i < 500; i++) {
    if (num === 1) return i;
    else if (num % 2 === 0) num = num / 2;
    else num = num * 3 + 1;
    if (i === 499) return -1;
  }
}

function solution(num) {
  for (let i = 0; i < 500; i++) {
    if (num === 1) return i;
    else if (num % 2 === 0) num = num / 2;
    else num = num * 3 + 1;
  }
  return -1;
}
