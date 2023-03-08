import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getAccessToken } from "../../../../commons/libraries/getAccessToken";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../../commons/stores/index";

// export const useAuth2 = () => { // 로컬스토리지 로그인 방식의 권한분기
//   const router = useRouter();
//   useEffect(() => {
//     if (localStorage.getItem("accessToken") === null) {
//       alert("로그인 후 이용 가능합니다.");
//       void router.push("/boards");
//     }
//   }, []);
// };

export const useAuth = (): void => {
  const router = useRouter();
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  const accessToken = useRecoilState(accessTokenState)[0];

  // const async;

  useEffect(() => {
    // (async () => {
    //   await aaa.toPromise().then((newAccessToken) => {
    //     console.log("useAuthAccessToken", accessToken);
    //     console.log("useAuth", newAccessToken);
    //     if (newAccessToken === undefined) {
    //       alert("로그인 후 이용 가능합니다.");
    //       void router.push("/sign/signin");
    //     }
    //   });
    // })();

    // void aaa.toPromise().then((newAccessToken) => {
    //   console.log("useAuthAccessToken", accessToken);
    //   console.log("useAuth", newAccessToken);
    //   if (newAccessToken === undefined) {
    //     alert("로그인 후 이용 가능합니다.");
    //     void router.push("/sign/signin");
    //   }
    // });

    (async () => {
      const accessToken = await getAccessToken();
      if (accessToken === undefined) {
        alert("로그인 후 이용 가능합니다.");
        void router.push("/sign/signin");
      }
    })();
  }, []);
  // void aaa.toPromise().then((newAccessToken) => {
  //   console.log("useAuthAccessToken", accessToken);
  //   console.log("useAuthNewAccessToken", newAccessToken);
  //   if (newAccessToken === undefined) {
  //     alert("로그인 후 이용 가능합니다.");
  //     void router.push("/sign/signin");
  //   }
  // });
};
