import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import WriterPage from "../../../src/commons/components/units/22";
import { isEditState } from "../../../src/commons/components/units/22";

export default function EditPage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  // setIsEdit(true);

  // useEffect(() => {
  //   setIsEdit(true);
  // }, []);
  return <WriterPage></WriterPage>;
}
