import { useQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery(FETCH_BOARDS);
  console.log(data?.fetchBoards);

  const onClickPage = (event) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const getDebounce = _.debounce((a) => {
    refetch({ page: 1, search: a });
    setKeyword(a);
  }, 500);

  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };

  return (
    <div>
      검색창: <input type="text" onChange={onChangeSearch}></input>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>
            {el.title
              .replaceAll(
                keyword,
                `@!$@#$#!@#$!!@#$@#!@@#$!@@#$!@%%^&&*@!#${keyword}@!$@#$#!@#$!!@#$@#!@@#$!@@#$!@%%^&&*@!#`
              )
              .split("@!$@#$#!@#$!!@#$@#!@@#$!@@#$!@%%^&&*@!#")
              .map((el) => (
                <sapn style={{ color: el === keyword ? "blue" : "black" }}>
                  {el}
                </sapn>
              ))}
          </span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))}
    </div>
  );
}
