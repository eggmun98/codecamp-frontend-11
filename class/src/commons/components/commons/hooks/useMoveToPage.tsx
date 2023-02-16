import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../stores";

interface IUseMoveToPageReturn {
  visitedPage: string;
  onClickMoveToPage: (path: string) => () => void;
}

export const useMoveToPage = (): IUseMoveToPageReturn => {
  const router = useRouter();
  const [visitedPage, setVistitedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => () => {
    setVistitedPage(path); // 로그인페이지일때는 set하지 않도록 추가 방법1
    // 이거 하는 이유는 만약 상품을 보다가 상품을 살려고 했는데 로그인이 필요하다고해서
    // 자동으로 로그인 페이지를 갔고 로그인 했는데 다시 원래 있떤 페이지로 갈려면
    // 전에 있었던 페이지를 저장해야하기 때문에 씀
    // 또 로그인 페이지는 저장하면 안됨 그래야 전에 있던 페이지를 갈수 있음
    // 이방법마록 로컬스토리지에 주소를 저장하는 방법이 있음!!
    void router.push(path);
    // localStorage.setItem("visitedPage", path); // 방법2
  };

  return {
    visitedPage: visitedPage,
    onClickMoveToPage: onClickMoveToPage,
  };
};
