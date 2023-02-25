import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAccessToken } from "../libraries/getAccessToken";
import { restoreAccessTokenLoadable } from "../stores";
import { useRecoilValueLoadable } from "recoil";

export const 로그인체크 = (컴포넌트: any) => (프롭스: any) => {
  const router = useRouter();
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 1. 로그인 체크 (리플래쉬 토큰 이전에 했던 로그인 체크방식)
  // useEffect(() => {
  //   if (localStorage.getItem("accessToken") === null) {
  //     alert("로그인 후 이용 가능합니다.");
  //     void router.push("/section23/23-05-login-check-hoc");
  //   }
  // }, []);

  // 2. 로그인 체크(refreshToken 이후 방식) => 안좋음 왜냐? _app.tsx에 이어서 총 2번 요청하게됨
  // useEffect(() => {
  //   void getAccessToken().then((newAccessToken) => {
  //     if (newAccessToken === undefined) {
  //       alert("로그인 후 이용 가능합니다.");
  //       // void router.push("/section23/23-05-login-check-hoc");
  //     }
  //   });
  // }, []);

  // 3. 로그인 체크(refreshToken 이후) => 좋음 / 함수를 공유 하므로 _app.tsx에 이어서 총 1번만 요청하게 됨
  useEffect(() => {
    void aaa.toPromise().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        alert("로그인 후 이용 가능합니다.");
        void router.push("/section23/23-05-login-check-hoc");
      }
    });
  }, []);

  // return <컴포넌트 {apple = 3} {banana = 5}></컴포넌트> 을 ...스프레드 연산자로 {...프롭스} 간단하게 써쭌거임

  return <컴포넌트 {...프롭스}></컴포넌트>;
};
