function solution(s) {
  var answer = "";
  return s.split("").sort().reverse().join("");
}

// const answer = []
// for(let i = 0; s.length; i++) {
//     answer.push(s[i])
// }
// 위 과정이 s.split("")랑 똑같음

function solution(s) {
  var answer = "";
  return s
    .split("")
    .sort((a, b) => (a > b ? -1 : 1))
    .join("");
}

// "1".charCodeAt() // 아스키코드 또는 유니코드로 바꿔줌
// "2".charCodeAt()

// 1 > 2

// 1 < 2

// "a".charCodeAt()
// "b".charCodeAt()
// "a" < "b"

// "A" < "a"
