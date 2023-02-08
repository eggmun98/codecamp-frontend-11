function a(num) {
  let str = "";

  for (let i = 1; i <= num; i++) {
    str += i;
    if (i !== num) {
      str += "-";
    }
  }

  return str;
}

// function helloWorld (num) {
//     let str = [...num]
//     str.join("-")
//     return str

// }

function a(num) {
  let str = "";

  for (let i = 1; i <= num; i++) {
    if (i !== 1) {
      str += "-";
    }
    str += i;
  }

  return str;
}
