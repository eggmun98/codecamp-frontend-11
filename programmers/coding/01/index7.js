const helloWorld = () => {
  const number = "01012345678";
  let arr = [];
  let abc = [...number];
  arr[0] = abc[0] + abc[1] + abc[2];
  arr[1] = abc[3] + abc[4] + abc[5];
  arr[2] = abc[6] + abc[7] + abc[8] + abc[9];

  return arr;
};
// 함수가 호출되면 오른쪽에 결과가 표시됩니다. 👉
helloWorld();

// const helloWorld = () => {
//   const number = "01012345678";
//   let arr = [];
//   let abc = [...number];
//     let j = 3;
//   arr[0] = abc[0] + abc[1] + abc[2]
//   for(let i = 1; i<3; i++) {
//     arr[i] = abc[j] + abc[j + 1] + abc[ j + 2] + abc[j + 3]
//     j = j + 4
//   }

//   // arr[0] = abc[0] + abc[1] + abc[2];
//   // arr[1] = abc[3] + abc[4] + abc[5];
//   // arr[2] = abc[6] + abc[7] + abc[8] + abc[9];

//   return arr;
// }
// // 함수가 호출되면 오른쪽에 결과가 표시됩니다. 👉
// helloWorld()
