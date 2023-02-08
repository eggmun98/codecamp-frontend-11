// function solution(array, commands) {
//     var answer = [];
//     let bbq = []

// commands.map((el) => {
//       answer.push(array.slice(el[0]-1, el[1]).sort())
// })
//  return answer
// }

function solution(array, commands) {
  var answer = [];

  for (let idx = 0; idx < commands.length; idx++) {
    const i = commands[idx][0];
    const j = commands[idx][1];
    const k = commands[idx][2];

    const result = array.slice(i - 1, j).sort((a, b) => {
      return a > b ? 1 : -1; // 자른 배열을 오름차순으로 정렬
    });
    answer.push(result[k - 1]);
  }
  return answer;
}
