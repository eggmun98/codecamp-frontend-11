const helloWorld = (str) => {
  let count;
  count = [...str];
  sum = 0;
  for (let i = 0; i < count.length; i++) {
    if (count[i] === "a" || count[i] === "A") {
      sum++;
    }
  }

  return sum;
};
helloWorld();

const helloWorld2 = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "a" || str[i] === "A") {
      sum++;
    }
  }
  return sum;
};

const helloWorld3 = (str) => {
  str = str.toLowerCase(); // 가져온 문자들을 소문자로 바꿔줌
  // str.toUpperCase() 대문자로 바꿔줌
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "a") {
      sum++;
    }
  }
  return sum;
};
