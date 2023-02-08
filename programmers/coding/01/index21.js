const helloWorld = (month) => {
  if (month === 2) {
    return 28;
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  } else {
    return 31;
  }
};
helloWorld();

//간단한 방법
// const monthList = { 1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31}
// function days (month) {
// console.log( monthList[month], month)
//} days(4)

// const helloWorld = (month) => {

//     if (
//        month === 1 ||
//        month === 3 ||
//        month === 5 ||
//        month === 7 ||
//        month === 8 ||
//        month === 10 ||
//        month === 12
//      ) {
//        return 31;
//      } else if (month === 4 || month === 6 || month === 9 || month === 11)
//        return 30;
//      else {
//        return 29;
//      }
//    }
//    helloWorld()
