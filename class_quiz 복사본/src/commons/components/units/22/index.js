import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { atom } from "recoil";

export const isEditState = atom({
  key: "isEditState",
  default: true,
});

export default function WriterPage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  return <h1>{isEdit ? "수정하기" : "등록하기"}</h1>;
}
