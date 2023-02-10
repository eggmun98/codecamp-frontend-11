import { useEffect, useState } from "react";
import BoardWriter from "../../../src/commons/components/units/22-global-state/BoardWrite.container";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/components/commons/stores";

export default function GlobalStateWithRecoilPage(): JSX.Element {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return <BoardWriter></BoardWriter>;
}
