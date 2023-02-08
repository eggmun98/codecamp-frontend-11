import { gql } from "@apollo/client";

// export const myGraphql2 = gql`
//   query fetchProduct($productId: ID) {
//     fetchProduct(productId: $productId) {
//       _id
//       seller
//       name
//       detail
//       price
//     }
//   }
// `;

export const fetchProducts = gql`
  query {
    fetchProducts {
      _id
      seller
      name
      detail
      price
    }
  }
`;

export const deleteProduct = gql`
  mutation deleteProduct($productId: ID) {
    deleteProduct(productId: $productId) {
      _id
      number
      message
    }
  }
`;
