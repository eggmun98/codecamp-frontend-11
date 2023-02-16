import { useRouter } from "next/router";

export const useMoveToPage = () => {
  const router = useRouter();

  const onClickMoveTopage = (path: string) => () => {
    router.push(path);
  };

  return { onClickMoveTopage };
};
