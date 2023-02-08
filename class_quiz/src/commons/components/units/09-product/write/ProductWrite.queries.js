import { gql } from "@apollo/client";

export const myGraphql = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      message
    }
  }
`;

export const myGraphql2 = gql`
  mutation updateProduct(
    $productId: ID
    $updateProductInput: UpdateProductInput!
  ) {
    updateProduct(
      productId: $productId
      updateProductInput: $updateProductInput
    ) {
      _id
      message
    }
  }
`;
