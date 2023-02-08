const helloWorld = (num) => {
  let str = "";
  for (let i = 1; i <= num; i++) {
    if (i % 2 !== 0) {
      str = str + i;
    }
  }
  return str;
};
helloWorld();

// const helloWorld = (num) => {
//     let str = ""
//     str = [...num]
//     let sum = []
//     for(let i =0; i<str.length; i++) {
//       if(str[i] % 2 !== 0) {
//         sum.push(str[i])
//       }
//     }

//     return sum.join("")

//   }
//   helloWorld()
