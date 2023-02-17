import { useRouter } from "next/router";

export const useMoveToPageMode = () => {
  const router = useRouter();

  const onClickMoveToPage = (path: string) => () => {
    router.push(path);
  };

  return { onClickMoveToPage };
};
