const helloWorld = () => {
  let fruits = ["사과", "바나나"];
  fruits[0] = "맛있는 사과";
  fruits[1] = "맛있는 바나나";

  return fruits;
};
// 함수가 호출되면 오른쪽에 결과가 표시됩니다. 👉
helloWorld();
