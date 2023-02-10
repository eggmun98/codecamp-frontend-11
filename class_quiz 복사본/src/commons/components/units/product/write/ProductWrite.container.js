import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import ProductWriteUI from "./ProductWrite.presenter";
import { myGraphql } from "./ProductWrite.queries";

export default function ProductWrite() {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const [seller, setSeller] = useState();
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState();

  const [myGraphqlResult] = useMutation(myGraphql);

  const onClickButton = async () => {
    // try {
    //   const result = await myGraphqlResult({
    //     variables: {
    //       seller: seller,
    //       createProductInput: {
    //         name: name,
    //         detail: detail,
    //         price: price,
    //       },
    //     },
    //   });
    //   // "/06/router/"
    //   // router.push("/07/router/" + result.data.createProduct._id);
    //   console.log(result.data.createProduct._id);
    //   console.log(result);

    //   function pro1(event) {
    //     setSeller(event.target.value);
    //     if (event.target.seller && name && detail && price) {
    //       setIsActive(true);
    //     }
    //   }

    //   function pro2(event) {
    //     setName(event.target.value);
    //     if (seller && event.target.name && detail && price) {
    //       setIsActive(true);
    //     }
    //   }

    //   function pro3(event) {
    //     setDetail(event.target.value);
    //     if (seller && name && event.target.detail && price) {
    //       setIsActive(true);
    //     }
    //   }

    //   function pro4(event) {
    //     setPrice(Number(event.target.value));
    //     if (seller && name && detail && event.target.price) {
    //       setIsActive(true);
    //     }
    //     // console.log(typeof Number(event.target.value));
    //   }
    // } catch (error) {
    //   alert("오류가 발생했습니다.");
    // }

    // ----------------------------------------------

    const result = await myGraphqlResult({
      variables: {
        seller: seller,
        createProductInput: {
          name: name,
          detail: detail,
          price: price,
        },
      },
    });

    router.push("/07/detail/" + result.data.createProduct._id);
    console.log(result.data.createProduct._id);
    console.log(result);
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
      aaa={onClickButton}
      bbb={pro1}
      ccc={pro2}
      ddd={pro3}
      eee={pro4}
      isActive={isActive}
    ></ProductWriteUI>
  );
}
