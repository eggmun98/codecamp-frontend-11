const helloWorld = (num) => {
  if (num === 0) {
    return "Zero";
  } else if (num % 2 === 0) {
    // if(!num % 2) 이렇게 적어도 됨
    // 왜나하면은 num % 2는 0이고 0은 펄시이기 때문에
    return "Even";
  } else {
    // else if( num % 2) 어짜피 나누면 1이상 이기때문에 트루시라서 이렇게 사용해도 됨
    return "Odd";
  }
};

helloWorld();
