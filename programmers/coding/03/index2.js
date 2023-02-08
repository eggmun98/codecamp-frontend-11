function solution(arr) {
  let answer = [];
  if (arr[1] === undefined || arr[0] === arr[1]) return (answer = [-1]);
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length; j++)
      if (arr[i] > arr[j]) answer.push(arr[i]);
  return (answer = [...new Set(answer)]);
}

function solution(arr) {
  let answer = [];
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) answer.push(arr[i]);
  }
  return answer.length !== 0 ? answer : [-1];
}
