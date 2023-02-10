const classmates = [
  { name: "철수", age: 10, school: "토끼초등학교" },
  { name: "영희", age: 13, school: "다람쥐초등학교" },
  { name: "훈이", age: 11, school: "토끼초등학교" },
];

function sub() {
  classmates.map((el) => {
    if (el.school === "토끼초등학교") {
      el.candy = 10;
    }
    if (el.school === "다람쥐초등학교") {
      el.name = el.name + "어린이";
    }
  });
  return classmates;
}

sub();

// function main() {
//     for (let i = 0; i < classmates.length; i++) {
//       if (classmates[i].school === "토끼초등학교") {
//         classmates[i].candy = 10;
//       }
//       if (classmates[i].school === "다람쥐초등학교") {
//         classmates[i].name = classmates[i].name + "어린이";
//       }
//     }
//     return classmates;
//   }
