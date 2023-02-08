export default function ProductListUI(props) {
  return (
    <div>
      {props.aaa?.fetchProducts.map((el) => (
        <div key={el._id}>
          <span>
            <input type="checkbox"></input>
          </span>
          <span style={{ margin: "10px" }}>{el.seller}</span>
          <span style={{ margin: "10px" }}>{el.name}</span>
          <span style={{ margin: "10px" }}>{el.detail}</span>
          <span style={{ margin: "10px" }}>{el.price}</span>
          <span>
            <button id={el._id} onClick={props.onClickDelete}>
              삭제
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

{
  /* <div>
      <div>판매자 : {props.aaa?.fetchProducts.seller}</div>
      <div>상품명 : {props.aaa?.fetchProducts.name}</div>
      <div>상품 내용 : {props.aaa?.fetchProducts.detail}</div>
      <div>상품 가격 : {props.aaa?.fetchProducts.price}</div>
    </div> */
}
