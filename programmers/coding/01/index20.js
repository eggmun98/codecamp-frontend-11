const helloWorld = (num) => {
  if (num >= 24) {
    return "조금 덥습니다.";
  } else if (num <= 18) {
    return "조급 춥네요";
  } else {
    return "날씨가 좋네요";
  }
};
helloWorld();
