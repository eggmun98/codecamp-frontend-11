import { useState } from "react";

export const countFun = () => {
  const [count, setCount] = useState(0);
  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };
  return {
    count,
    onClickCountUp,
  };
};

// export default countFun;
