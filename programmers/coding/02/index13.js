function solution(numbers) {
  var answer = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) answer.push(numbers[i] + numbers[j]);
    }
  }
  const sum = new Set(answer); // 중복값 제거 메소드
  const abc = [...sum]; // 전개로 새로운 배열 생성
  abc.sort((a, b) => a - b);
  return abc;
}

function solution(numbers) {
  var answer = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) answer.push(numbers[i] + numbers[j]);
    }
  }
  const sum = [...new Set(answer)].sort((a, b) => a - b);
  return sum;
}

function solution(numbers) {
  var answer = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      answer.push(numbers[i] + numbers[j]);
    }
  }
  const sum = [...new Set(answer)].sort((a, b) => a - b);
  return sum;
}

// sort()는 인자가 없으면 8 9 4 ,12, 24 5 6 7 가 있으면 12 24 4 5 6 7 8 9 순으로 정렬됨 왜나하면 앞에 있는 숫자 12에서 1만 보고 정렬하기 때문 24도 앞에 2만 보고 정렬함

new set(); // 배열 역할을 해주는 객체이다. 그래서 set만 하면 {} 이게 나왔었음 // 배열에서 중복되는 값 제거

Array.from(new Set()); // 객체에서 배열이 됨
