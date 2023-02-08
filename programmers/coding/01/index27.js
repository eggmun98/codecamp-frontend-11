function bigNum(str) {
  let biggest = 0;

  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) > biggest) {
      biggest = Number(str[i]);
      console.log(i, biggest);
    }
  }
  return biggest;
}

bigNum("1233456789");

// function bigNum(str) {
//   let biggest = 0;

//   for (let i = 0; i < str.length; i++) {
//     if (Number(str[i]) > biggest) {
//       biggest = Number(str[i]);
//     }
//   }
//   return biggest;
// }

//   const sum = [...str];
//   for (let i = 0; i < sum.length; i++) {
//     if (sum[i] > sum[i + 1] && sum[i] > sum[i - 1]) {
//       str = sum[i];
//     }
//   }
//   if (sum[0] > str) {
//     str = sum[0];
//   } else if (sum[sum.length - 1] > str) {
//     str = sum[sum.length - 1];
//   }
//   return str[0];
// };
// helloWorld("384857139");

// number 메서드 활용
