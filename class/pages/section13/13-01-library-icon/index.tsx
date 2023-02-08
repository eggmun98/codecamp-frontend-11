import { ArrowUpOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import type { MouseEvent } from "react";

const MyIcon = styled(ArrowUpOutlined)`
  color: red;
  font-size: 50px;
`;

export default function LibraryIconPage(): JSX.Element {
  const onClickDElete = (event: MouseEvent<HTMLDivElement>): void => {
    console.log(event.currentTarget.id);
  };

  return <MyIcon id="qqq" onClick={onClickDElete} />;
}
