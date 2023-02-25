import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import { restoreAccessTokenLoadable } from "../../../../commons/stores/index";

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

  useEffect(() => {
    void aaa.toPromise().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        alert("로그인 후 이용 가능합니다.");
        void router.push("/sign/signin");
      }
    });
  }, []);
};
