export default function TypescriptPage() {
  // 타입스크립트에는 타입추론이 있다. 즉 처음에 들어간 값을 가지고서 무슨 타입인지 추론을 함 그래서 타입 지정을 안해도 다른 타입을 넣으면 오류를 알려줌
  // 타입 추론
  let aaa = "안녕하세요";
  aaa = 4;

  // 타입명시
  let bbb: string = "반갑습니다.";

  // 타입명시가 필요한 상황
  let ccc: string | number = 1000;
  ccc = "1000원"; // 왜? 1000이라는 숫자와 원이라는 문자를 합치기 위해서 즉 스트링 또는 넘버 타입이야 이럴때 타입명시가 필요하다

  // 숫자타입
  let ddd: number = 10;
  ddd = "철수";

  // 불린타입
  let eee: boolean = true;
  eee = false;
  eee = "false"; // false를 문자열로 받아올 경우가 있다. 즉 형태가 문자열밖에 해석을 못해서 펄스랑 트루를 문자열로 보냄 근데 // 그리고 문자열안에 "false"은 트루가 됨 왜? " " 이게 트루고 "" 이게 펄시니까
  // "철수" 트루 0 펄시 "아아아" 트루 "false" 트루 "true" 트루 이다.
  // 자바스크립트에는 "false" 떄문에 한계가 있다.

  // 배열타입
  let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
  fff.push("1");
  fff.push(1);
  let ggg: string[] = ["철수", "영희", "훈이", 10];
  let hhh: (string | number)[] = ["철수", "영희", 10]; // 왼쪽에 스트링과 넘버를 안적어도 타입추론으로 알아서 스트링과 넘버인것을 알음

  // 객체타입
  interface Iprofile {
    name: string; //ts는 객체에 쉬표 안넣어도됨
    age: number | string;
    school: string;
    hobby?: string; // 밑에 객체에 hobby는 새로 추가했는데 ?를 안붙이면 오류생김 즉 ?는 있으면 돼고 없어도 돼고라는 뜻이다.
  }

  const profile: Iprofile = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
  };
  profile.name = "훈이"; // 타입 추론으로 인해서 문자만 가능
  profile.age = "8살";
  profile.hobby = "수영";

  // 함수타입
  function add(num1: number, num2: number, unit: string): string {
    // :string은 리턴타입이다. 즉 리턴타입도 정할 수 있다.
    return num1 + num2 + unit;
  }

  const result = add(1000, 2000, "원"); // 이 함수를 result에 넣으면 result은 자동으로 타입을 알수 있음 즉 함수의 리턴값이 무슨 타입인지 알수 있다. 이게 바로 타입스크립트의 장점

  add("철수", 1, 2); // 이건 오류 num1은 넘버라서

  const add2 = (num1: number, num2: number, unit: string): string => {
    // :string은 리턴타입이다. 즉 리턴타입도 정할 수 있다.
    return num1 + num2 + unit;
  };

  const result2 = add2(1000, 2000, "원"); // 결과에 리턴 타입도 예측 가능!!

  // any타입
  let qqq: any = "철수"; // 자바스크립트와 동일!
  qqq = 123;
  qqq = true;

  return <></>;
}
