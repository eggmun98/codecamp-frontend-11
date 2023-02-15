// 1. 함수를 리턴하는 함수
function qqq() {
  const apple = 10;

  return function bbb() {
    const banana = 20;
    console.log(banana);
    console.log(apple);
  };
}
qqq()();

// 2번째 연습 // 함수를 리턴하는 함수 - 인자를 받아서 리턴
function aaa(apple) {
  return function bbb(banana) {
    console.log(banana);
    console.log(apple);
  };
}

aaa(50)(100);

// 함수를 리턴하는 함수 - 화살표 함수
const bbb = (apple) => (banana) => {
  console.log(banana);
  console.log(apple);
};

bbb(50)(100);

// 4. 함수를 리턴하는 함수 - 인자 여러개
const ccc = (apple) => (banana) => (tomato) => (orange) => {
  console.log(apple);
  console.log(banana);
  console.log(tomato);
  console.log(orange);
};

ccc(10)(20)(30)(40);

// HOF - Higher Order Function
