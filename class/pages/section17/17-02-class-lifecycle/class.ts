// class Date {
//   qqq = 3;

//   getFullYear() {}

//   getMonth() {}
// }

// const date = new Date();
// console.log(date.getFullYear());
// console.log(date.getMonth() + 1);

// class Monster {
//   power = 50;
//   attack() {
//     console.log("공격합니다.");
//   }
// }

// //상속
// class 슈퍼몬스터 extends Monster {
//   // 몬스터를 상속
//   run() {
//     console.log("도망가자!");
//   }

//   // 오버라이딩: 덮어쓰기 한 경우를 오버라이딩이라고 한다.
//   attack(): void {
//     // 몬스터에 있는 어택도 상속 받았지만 바꾸고 싶어서 다시 새로 적음 즉 상속받은 어택은 사라지고 지금 이 어택이 남음
//     console.log("슈퍼몬스터 필살기!!");
//   }
// }

// const monster = new Monster();
// monster.power; // 데미지 50
// monster.attack(); // 공격합니다!!

// const mymonster = new 슈퍼몬스터();
// mymonster.power; // 50
// mymonster.attack(); // 슈퍼몬스터 필살기!!
// mymonster.run(); // 도망가기 실행
