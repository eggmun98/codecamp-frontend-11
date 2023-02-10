import { useState } from "react";
import { Rate } from "antd";

export default function abcPage() {
  const [value, setValue] = useState(3);

  console.log(value);
  function qqq(event) {
    alert(event);
    setValue(event);
  }

  return (
    <span>
      <Rate onChange={qqq} value={value} />
      {value}
    </span>
  );
}
