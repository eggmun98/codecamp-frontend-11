function solution(phone_number) {
  var answer = [];
  for (let i = 0; i < phone_number.length; i++) {
    if (phone_number.length - 4 > i) answer[i] = "*";
    else answer[i] = phone_number[i];
  }
  return answer.join("");
}

function solution(phone_number) {
  var answer = "";
  for (let i = 0; i < phone_number.length; i++) {
    if (i < phone_number.length - 4) {
      answer += "*";
    } else {
      answer += phone_number[i];
    }
  }
  return answer;
}

function solution(phone_number) {
  let answer = "";
  answer = answer.padStart(phone_numver.length - 4, "*");
  answer += phone_number.substring(phone_number.length - 4); // phone_number.length -4부터 마지막까지 잘라온다.

  return answer;
}
