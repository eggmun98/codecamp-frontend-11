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
  position: relative;
`;

export const ProductWrapper = styled.div`
  margin: 10px;
  width: 20%;
  height: 300px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  background-color: whitesmoke;
`;

export const ImageWrapper = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  /* border: 0px solid black; */
  border-radius: 10px 10px 0 0;
`;

export const NoImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

export const SearchInput = styled.input`
  padding: 10px;
  position: absolute;
  width: 40%;
  height: 50px;
  top: -200px;
  border: 2.5px solid #489bb0;
  outline-color: #489bb0;
`;
