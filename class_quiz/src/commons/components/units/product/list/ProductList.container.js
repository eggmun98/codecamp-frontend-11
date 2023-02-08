import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import ProductDetailUI from "./ProductList.presenter";
import ProductListUI from "./ProductList.presenter";
import { deleteProduct, fetchProducts } from "./ProductList.queries";

export default function ProductList() {
  const router = useRouter();
  const { data } = useQuery(fetchProducts);
  const [mysql] = useMutation(deleteProduct);
  // const { data } = useQuery(fetchProducts, {
  //   variables: {
  //     page: router.query.num,
  //   },
  // });

  const onClickDelete = (event) => {
    mysql({
      variables: {
        productId: event.target.id,
      },
      refetchQueries: [{ query: fetchProducts }],
    });
  };
  console.log(mysql.id);

  // console.log(data);
  // console.log(router);
  // console.log(router.query);
  // console.log(router.query.num);

  return (
    <ProductListUI aaa={data} onClickDelete={onClickDelete}></ProductListUI>
  );
}
