import { useState } from "react";

export const onPointMode = () => {
  const [opa, setOpa] = useState(0);

  const onPoint = () => {
    if (opa === 0) {
      setOpa(1);
    } else if (opa === 1) {
      setOpa(0);
    }
  };
  return { opa, onPoint };
};
