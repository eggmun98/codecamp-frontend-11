import { useRouter } from "next/router";
import { useMutationItemDelete } from "../../mutations/product/useMutationItemDelete";

export const useMarketDeleteMode = () => {
  const router = useRouter();

  const [delete_used_item] = useMutationItemDelete();

  // 상품 게시글 삭제 버튼
  const onClickItemDeleteButton = async () => {
    await delete_used_item({
      variables: {
        useditemId: router.query.number,
      },
    });
    alert("글이 삭제되었습니다.");
    router.push("/markets");
  };
  return { onClickItemDeleteButton };
};
