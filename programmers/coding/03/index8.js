function solution(arr, divisor) {
  var answer = [];
  for (let i = 0; i < arr.length; i++)
    if (arr[i] % divisor === 0) answer.push(arr[i]);
  if (answer.length === 0) return (answer = [-1]);
  return answer.sort((a, b) => a - b);
}

function solution(arr, divisor) {
  var answer = [];
  for (let i = 0; i < arr.length; i++)
    if (arr[i] % divisor === 0) answer.push(arr[i]);
  return answer.length === 0 ? (answer = [-1]) : answer.sort((a, b) => a - b);
}

function solution(arr, divisor) {
  var answer = [];
  for (let i = 0; i < arr.length; i++)
    if (arr[i] % divisor === 0) answer.push(arr[i]);
  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}

function solution(arr, divisor) {
  var answer = arr.filter((num) => {
    return num % divisor === 0;
  });
  return answer.length === 0 ? [-1] : answer.sort((a, b) => (a > b ? 1 : -1));
}
