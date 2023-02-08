import { ListButton, ListNextButton } from "./Paginations01.styles";

export default function Paginations01UI(props): JSX.Element {
  return (
    <>
      <ListNextButton onClick={props.onClickPrevPage}>{"<"}</ListNextButton>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + props.startPage <= props.lastPage && (
            <ListButton
              key={index + props.startPage}
              id={String(index + props.startPage)}
              onClick={props.onClickPageButton}
              isActive={props.startPage + index === props.activedPage}
            >
              {index + props.startPage}
            </ListButton>
          )
      )}
      <ListNextButton onClick={props.onClickNextPage}>{">"}</ListNextButton>
    </>
  );
}
