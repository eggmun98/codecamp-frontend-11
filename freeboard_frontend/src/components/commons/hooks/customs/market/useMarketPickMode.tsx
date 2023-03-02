import { useRouter } from "next/router";
import { useMutationToggleUsedItemPick } from "../../mutations/product/useMutationToggleUsedItemPick";

export const useMarketPickMode = () => {
  const router = useRouter();
  const [toggle_used_item_pick] = useMutationToggleUsedItemPick();

  const onClickPick = async (): Promise<void> => {
    await toggle_used_item_pick({
      variables: {
        useditemId: router.query.number,
      },
    });
    alert("찜하기 하였습니다.");
    console.log("토글 픽", toggle_used_item_pick);
  };

  return { onClickPick };
};
