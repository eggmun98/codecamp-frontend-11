import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductDetailUI from "./ProductDetail.presenter";
import { myGraphql2 } from "./ProductDetail.queries";

export default function ProductDetail() {
  const router = useRouter();

  const { data } = useQuery(myGraphql2, {
    variables: {
      productId: router.query.num,
    },
  });
  console.log(data);
  console.log(router);

  return <ProductDetailUI aaa={data}></ProductDetailUI>;
}
