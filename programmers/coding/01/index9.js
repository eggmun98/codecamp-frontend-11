const helloWorld = () => {
  const student = {
    name: "철수",
    age: 8,
  };

  const school = {
    name: "다람쥐초등학교",
    teacher: "다람이",
  };

  student.school = school;
  return student;
};
// 함수가 호출되면 오른쪽에 결과가 표시됩니다. 👉
helloWorld();
