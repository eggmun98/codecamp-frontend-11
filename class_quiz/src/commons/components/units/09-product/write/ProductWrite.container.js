import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import ProductWriteUI from "./ProductWrite.presenter";
import { myGraphql, myGraphql2 } from "./ProductWrite.queries";

export default function ProductWrite(props) {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const [seller, setSeller] = useState();
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState();

  const [myGraphqlResult] = useMutation(myGraphql);
  const [myGraphqlResult2] = useMutation(myGraphql2);

  const onClickButton = async () => {
    const result = await myGraphqlResult({
      variables: {
        seller: seller,
        createProductInput: {
          name: name,
          detail: detail,
          price: Number(price),
        },
      },
    });

    router.push("/09/" + result.data.createProduct._id);
    console.log(result.data.createProduct._id);
    console.log(result);
  };

  const onClickButton2 = async () => {
    const result = await myGraphqlResult2({
      variables: {
        productId: router.query.number,
        updateProductInput: {
          name: name,
          detail: detail,
          price: Number(price),
        },
      },
    });

    router.push("/09/" + result.data.updateProduct._id);
    // console.log(result.data.updateProduct._id);
  };

  function pro1(event) {
    setSeller(event.target.value);
    if (event.target.value && name && detail && price) {
      setIsActive(true);
    }
  }

  function pro2(event) {
    setName(event.target.value);
    if (seller && event.target.value && detail && price) {
      setIsActive(true);
    }
  }

  function pro3(event) {
    setDetail(event.target.value);
    if (seller && name && event.target.value && price) {
      setIsActive(true);
    }
  }

  function pro4(event) {
    setPrice(Number(event.target.value));
    if (seller && name && detail && event.target.value) {
      setIsActive(true);
    }
    // console.log(typeof Number(event.target.value));
  }

  return (
    <ProductWriteUI
      onClickButton={onClickButton}
      onClickButton2={onClickButton2}
      bbb={pro1}
      ccc={pro2}
      ddd={pro3}
      eee={pro4}
      isActive={isActive}
      isEdit={props.isEdit}
    ></ProductWriteUI>
  );
}
