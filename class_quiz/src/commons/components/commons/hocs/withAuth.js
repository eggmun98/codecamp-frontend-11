import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useEffect } from "react/cjs/react.development";
// useEffect를 자동완성 된거를 하니 오류가 났었다.!

export const withAuth = (Components) => (propss) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다.");
      router.push("/23/03-withAuth/03-login");
    }
  }, []);
  return <Components {...propss} />;
};
