import { IpcNetConnectOpts } from "net";

export interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. partial 타입
type aaa = Partial<IProfile>; // 만들었던 타입의 물음표를 붙여줌 왜? 다시 재사용하기 편하게 하려고 즉 재사용률 증가

// 2. Required 타입
type bbb = Required<IProfile>; // 위에 타입과 다르게 물음표를 다 없애줌 즉 다 필수 키를 입력하라는 뜻 이것도 재사용률 증가

// 3. Pick 타입
type ccc = Pick<IProfile, "name" | "age">; // 특정 키의 타입만 씀

// 4. Omit 타입
type ddd = Omit<IProfile, "school">; // 특정 키의 타입을 뺌

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"; // 유니온 타입 Union 타입이란 이렇게 철수 영희 훈이를 합친거
let child: eee = "영희"; // 이거는 철수, 영희, 훈이만 됨
let child2: string = "바나나"; // 이거는 철수 영희 훈이 바나나 사과 등등 다 됨

type fff = Record<eee, IProfile>; // 즉 철수에게 아이프로필 타입을 또 영희에게 아이프로필 타입을 훈이에게 아이프로필 타입을 줌 이게바로 Record 타입이다.

// 6. 객체의 key들로 Union타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "hobby" 이런 형식으로 뽑아오게 됨 i프로필에서 키만 뽑아오는게 keyof
let myprofile: ggg = "age"; // 즉 이건 name, age, hobby만 넣을 수 있음

// 7. type vs interface 차이는   => interface는 선언병합 가능
export interface IProfile {
  candy: number; //선언병합으로 추가됨
}

// 8. 배운거 응용
let profile: Partial<IProfile> = {
  candy: 10,
};
