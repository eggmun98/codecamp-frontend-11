import type { FormEvent } from "react";

export const wrapAsync = (asyncFunc: () => Promise<void>) => () => {
  void asyncFunc();
};

export const wrapFormAsync =
  (asyncFunc: () => Promise<void>) => (event: FormEvent<HTMLElement>) => {
    void asyncFunc();
    event.preventDefault(); // html 기본적으로 자체적인 기능을 막아줌
    // 즉 폼태크는 주소이동을 해주는 기능인데 이것을 안해준다면
    // 주소가 이동되면서 새로고침 형상을 느끼게 될것임!!
    // 이 방법이 싫다면 eslintrc에서  // "@typescript-eslint/no-misused-promises": "off",
    // 이것을 꺼야함!!
    // 근데 현재 이 함수의 방식은 다른 태그에서는 안될 수 있음!!
  };

// import { FormEvent } from "react";
// export const wrapAsync = (asyncFunc: () => Promise<void>) => (event: FormEvent<HTMLElement>) => {
//   void asyncFunc();
//   event.preventDefault(); // html 기본적으로 자체적인 기능을 막아줌
//   // 즉 폼태크는 주소이동을 해주는 기능인데 이것을 안해준다면
//   // 주소가 이동되면서 새로고침 형상을 느끼게 될것임!!
//   // 이 방법이 싫다면 eslintrc에서  // "@typescript-eslint/no-misused-promises": "off",
//   // 이것을 꺼야함!!
// };
