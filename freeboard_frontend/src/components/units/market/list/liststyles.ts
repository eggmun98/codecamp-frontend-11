import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

export const Qqq = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Scroll = styled(InfiniteScroll)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const MainWrapper = styled.div`
  /* width: 100%; */
  padding-left: 15%;
  /* padding-right: 10%; */
`;

export const ProductWrapper = styled.div`
  margin: 10px;
  width: 20%;
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
`;

export const ImageWrapper = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border: 0px solid black;
  border-radius: 10px;
`;
