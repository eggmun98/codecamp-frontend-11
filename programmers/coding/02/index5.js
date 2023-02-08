function solution(s) {
  var answer = s.length;
  if (s.length % 2 === 0)
    return (answer = String(s[answer / 2 - 1] + s[answer / 2]));
  else return (answer = String(s[answer / 2 - 0.5]));
}
