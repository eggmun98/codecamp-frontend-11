import WriterPage from "../../../src/commons/components/units/22";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/components/units/22";

export default function NewPage() {
  //   const [isEdit, setIsEdit] = useState(false);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  setIsEdit(false);

  //   useEffect(() => {
  //     setIsEdit(false);
  //   }, []);
  return <WriterPage></WriterPage>;
}
