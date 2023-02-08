function solution(seoul) {
  const x = seoul.indexOf("Kim");
  return `김서방은 ${x}에 있다`;
}

function solution(seoul) {
  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") {
      x = i;
      return `김서방은 ${i}에 있다`;
    }
  }
} // x가 김이라면 바로 반환

function solution(seoul) {
  let x = 0;
  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") {
      x = i;
      return `김서방은 ${x}에 있다`;
    }
  }
} // x가 김이라면 바로 반환

function solution(seoul) {
  let x = 0;
  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") {
      x = i;
      break;
    }
  }
  return `김서방은 ${x}에 있다`;
} // x가 김이라면 브레이커 하고 함수종료

function solution(seoul) {
  let x = 0;
  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") {
      x = i;
    }
  }
  return `김서방은 ${x}에 있다`;
}

// function solution(seoul) {
//   seoul.map((el, index) => {
//     if (el === "Kim") {
//       console.log("김서방은 " + index + "에 있다.");
//     }
//   });
// }
