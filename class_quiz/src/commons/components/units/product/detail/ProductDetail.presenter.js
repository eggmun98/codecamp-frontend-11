export default function ProductDetailUI(props) {
  return (
    <div>
      <div>판매자 : {props.aaa?.fetchProduct.seller}</div>
      <div>상품명 : {props.aaa?.fetchProduct.name}</div>
      <div>상품 내용 : {props.aaa?.fetchProduct.detail}</div>
      <div>상품 가격 : {props.aaa?.fetchProduct.price}</div>
    </div>
  );
}
