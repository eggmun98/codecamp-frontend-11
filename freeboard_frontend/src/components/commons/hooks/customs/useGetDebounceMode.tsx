import _ from "lodash";
import { ChangeEvent, useState } from "react";
import { IQuery } from "../../types/generated/types";
import { useQueryFetchBoards } from "../queries/board/useQueryFetchBoards";

export const getDebounceMode = () => {
  const { data, refetch } = useQueryFetchBoards();
  const [keyword, setKeyword] = useState("");
  // console.log("refetch:", refetch);
  const onChangeSearchButton = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.target.value);
  };

  const getDebounce = _.debounce((search) => {
    refetch({ page: 1, search: search });
    setKeyword(search);
  }, 500);

  return {
    onChangeSearchButton,
    getDebounce,
    keyword,
  };
};
