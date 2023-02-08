function solution(arr) {
  var answer = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      answer.push(arr[i]);
    }
  }
  return answer;
}

function solution(arr) {
  const answer = [];
  let i = 0;
  for (let key of arr) {
    if (key !== arr[i + 1]) {
      answer.push(key);
    }
    i++;
  }
  return answer;
}
// 이건 느림

function solution(arr) {
  const answer = [];

  for (let i in arr) {
    i = Number(i);
    if (arr[i] !== arr[i + 1]) {
      answer.push(arr[i]);
    }
  }
  return answer;
}
// i가 문자열로 받아오지기 때문에 넘버로 바꿔서 씀
// 이건 더 느림
