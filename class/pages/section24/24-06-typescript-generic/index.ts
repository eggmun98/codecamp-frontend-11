// 1. 문자/숫자/불린(primitive) 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입 => 그냥 자바스크립트랑 같음 별로 좋은게 아님!
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 * 1000);
  return [arg3, arg2, arg1];
};

const result = getAny("철수", , true);

// 3. unknown 타입 => any보다 조금 안전함
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 * 1000);
  return [arg3, arg2, arg1];
};

const result = getUnknown("철수", 123, true);

// 4. generic 타입 // 여기 리절트에 마우스를 올려보면 리턴 타입이 무엇인지 알수 있음!!
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result = getGeneric("철수", 123, true);

// 5. generic 타입 - 타입 고정
function getGeneric2<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result = getGeneric2<string, string, number>("철수", "영희", 123); // 이렇게 타입을 고정할 수 있다!
// const [count, setCount] = useState<number>(0);  // 바로 위의 방식처럼 타입고정 방식임!!

// 6. generic 타입3 - 타입 이름 간단하게 적기
function getGeneric3<S, N, B>(arg1: S, arg2: N, arg3: B): [B, N, S] {
    return [arg3, arg2, arg1];
  }
  
  const result = getGeneric3("철수", "영희", 123); // 이렇게 타입을 고정할 수 있다!
  
  // 7. generic 타입4 - 타입 이름 간단하게 적기
  const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
    return [arg3, arg2, arg1];
  };
  
  const result = getGeneric4("철수", 123, true);

