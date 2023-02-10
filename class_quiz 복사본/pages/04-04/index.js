import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const myGraphql = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function QuizPage0404() {
  const [happy] = useMutation(myGraphql);

  const [seller, setSeller] = useState();
  // const [name, setName] = useState();
  // const [detail, setDetail] = useState();
  // const [price, setPrice] = useState();

  const onClickButton = async () => {
    const sum = await happy({
      variables: {
        seller: seller,
        createProductInput: {
          name: "폰",
          detail: "아주좋은",
          price: 10000,
        },
      },
    });
    console.log(sum);
  };

  function 판매자(event) {
    setSeller(event.target.value);
  }
  // function 판매품(event) {
  //   setName(event.target.value);
  // }
  // function 설명(event) {
  //   setDetail(event.target.value);
  // }
  // function 가격(event) {
  //   setPrice(event.target.value);
  // }

  return (
    <div>
      판매자: <input onChange={판매자}></input>
      {/* 판매품: <input onChange={판매품}></input>
      설명: <input onChange={설명}></input>
      가격: <input onChange={가격}></input> */}
      <button onClick={onClickButton}>판매등록</button>
    </div>
  );
}
