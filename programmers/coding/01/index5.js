const helloWorld = () => {
  let students = ["철수", "영희", "훈이", "짱구", "유리"];
  const newArr = [];
  newArr.push(students[0], students[1], students[2]);

  return newArr;
};
// 함수가 호출되면 오른쪽에 결과가 표시됩니다. 👉
helloWorld();
