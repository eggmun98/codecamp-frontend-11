import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const myGraphql2 = gql`
  query fetchProduct($productId: ID) {
    fetchProduct(productId: $productId) {
      _id
      seller
      name
      detail
      price
    }
  }
`;

export default function ProductNumberPage() {
  const router = useRouter();

  const { data } = useQuery(myGraphql2, {
    variables: {
      productId: router.query.number,
    },
  });
  console.log(data);
  console.log(router);

  const onClickMove = () => {
    router.push("/09/" + router.query.number + "/edit");
  };

  return (
    <div>
      <div>판매자 : {data?.fetchProduct.seller}</div>
      <div>상품명 : {data?.fetchProduct.name}</div>
      <div>상품 내용 : {data?.fetchProduct.detail}</div>
      <div>상품 가격 : {data?.fetchProduct.price}</div>
      <button onClick={onClickMove}>수정하러가기</button>
    </div>
  );
}
