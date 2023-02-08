import styled from "@emotion/styled";
import { MainInput, MainButton } from "./ProductWrite.styles";

export default function ProductWriteUI(props) {
  return (
    <dev>
      판매자: <MainInput type="text" onChange={props.bbb}></MainInput>
      상품명: <MainInput type="text" onChange={props.ccc}></MainInput>
      상품 내용: <MainInput type="text" onChange={props.ddd}></MainInput>
      상품 가격: <MainInput type="text" onChange={props.eee}></MainInput>
      <MainButton
        onClick={props.isEdit ? props.onClickButton2 : props.onClickButton}
        isActive={props.isActive}
      >
        {props.isEdit ? "수정하기" : "등록하기"}
      </MainButton>
    </dev>
  );
}
