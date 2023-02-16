import _ from "lodash";
import { useState } from "react";
import { useQueryFetchBoards } from "../queries/useQueryFetchBoards";

export const getDebounceMode = () => {
  const { data, refetch } = useQueryFetchBoards();
  const [keyword, setKeyword] = useState("");
  console.log("refetch:", refetch);
  const onChangeSearchButton = (event): void => {
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
