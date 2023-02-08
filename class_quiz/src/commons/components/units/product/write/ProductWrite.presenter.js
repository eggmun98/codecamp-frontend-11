import { MainInput, MainButton } from "./ProductWrite.styles";

export default function ProductWriteUI(props) {
  return (
    <dev>
      판매자: <MainInput type="text" onChange={props.bbb}></MainInput>
      상품명: <MainInput type="text" onChange={props.ccc}></MainInput>
      상품 내용: <MainInput type="text" onChange={props.ddd}></MainInput>
      상품 가격: <MainInput type="text" onChange={props.eee}></MainInput>
      <MainButton onClick={props.aaa} isActive={props.isActive}>
        상품 등록
      </MainButton>
    </dev>
  );
}
