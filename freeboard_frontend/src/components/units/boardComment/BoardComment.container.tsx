import { ChangeEvent, MouseEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENTS,
  CREATE_BOARD_COMMENTS,
  UPDATE_BOARD_COMMENTS,
} from "./BoardComment.queries";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationDeleteBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IQuery,
  IQueryFetchBoardArgs,
  IUpdateBoardCommentInput,
  IUpdateBoardInput,
} from "../../commons/types/generated/types";
import BoardCommentUI from "./BoardComment.presenter";

interface IBoardCommentProps {
  data?: any;
  isEdit: boolean;
}

export default function BoardCommentPage() {
  const router = useRouter();

  // 댓글 쿼리
  const { data: CommentsData, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: {
      boardId: router.query.num,
    },
  });

  const [deleteBoardComments] = useMutation(DELETE_BOARD_COMMENTS);
  const [createBoardComments] = useMutation(CREATE_BOARD_COMMENTS);
  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENTS);

  // 리스트에서 수정창으로 바뀌기 변수
  const [myIndex, setMyIndex] = useState(-1);

  // 작성 변수들~~?
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [length, setLength] = useState(0);
  const [rating, setRating] = useState(0);

  // const [abc, setAbc] = useState("");

  // 삭제 변수들!
  const [dePassword, setDePassword] = useState("");
  const [dePasswordId, setDePasswordId] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 모달창 변수

  // 업데이트 변수들~~
  const [upId, setUpId] = useState(""); // 댓글 아이디
  const [upContents, setUpContents] = useState(""); // 내용 체크
  const [upPassword, setUpPassword] = useState(""); // 비번 체크
  const [upLength, setUpLength] = useState(""); // 내용 길이 체크
  const [upLengthBoolean, setUpLengthBoolean] = useState(false); // 트루면 현재 댓글 길이 보여주고 펄스면 등록했던 길이 표시
  const [upRating, setUpRating] = useState(0);

  // 수정창 열기 버튼
  const onClickUpdateCommentsWindowButton = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setMyIndex(Number(event.currentTarget.id));
    setUpLength(""); // 초기화 시켜줘야 다른 댓글에서도 길이값 저장 가능!
    setUpLengthBoolean(false); // 펄스면 현재 등록했던 길이 표시
    // setAbc(CommentsData.fetchBoardComments[event.target.id].contents);
  };

  // 수정창 내용 체크
  const upContentsCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setUpContents(event.target.value);
    setUpLength(Number(event.target.value.length));
    setUpLengthBoolean(true); // 트루면 현재 댓글 길이
  };

  // 수정창 비번 체크
  const upPasswordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setUpPassword(event.target.value);
    setUpId(event.target.id); // 현재 이게 이 위치에 있어서
    // 두번째 수정에 문제가 있을 수 있음!! // 비번은 문제가 없는거 같음
  };

  // 수정창 별점 체크
  function upRatingCheck(rating: number) {
    setUpRating(rating);
  }

  // 댓글 수정 버튼
  const onClickUpdateCommentsButton = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    // console.log(passId);
    // console.log(CommentsData.fetchBoardComments[myIndex].rating);
    const updateBoardCommentInput: { contents?: string; rating?: number } = {};
    // 만약 수정한 값이 빈값일 경우 원래 있던 값을 남기기 위해서 이프문 작성함
    // if (updateBoardCommentInput.contents === "")
    //   updateBoardCommentInput.contents =
    //     CommentsData.fetchBoardComments[myIndex].contents;
    // if (updateBoardCommentInput.rating === 0)
    //   updateBoardCommentInput.rating =
    //     CommentsData.fetchBoardComments[myIndex].rating;
    upContents && (updateBoardCommentInput.contents = upContents);
    upRating && (updateBoardCommentInput.rating = upRating);

    // !!upContents ?? (updateBoardCommentInput.contents = upContents)

    const result = await updateBoardComment({
      variables: {
        updateBoardCommentInput: updateBoardCommentInput,
        password: upPassword,
        boardCommentId: upId,
      },
      // if(contents === "") {
      // result.updateBoardCommentInput.contents = aaa;
      // },
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: { boardId: router.query.num },
        },
      ],
    });

    // console.log(passId);

    setMyIndex(-1); // 이거 한 이유는 MyIndex를 -1해서 수정창을 가리기 위해서 함
    // setUpPassword(""); // 비번체크인데 실험해보기 ? 없어도 되는지 있어야 하는지
    setUpRating(0); // 이렇게 한 이유는 빈값으로 별점을 수정을 하려고 하면 스테이트 값이 한타임 늦게 불러와서
    // 이전 별점 값을 가져와서 오류가 생김 그래서 이렇게 초기화해서 프리젠테이션 수정칸에 벨류 값은 props.upRate 넣은거임
    // 근데 또 문제점은 수정하면 원래 무슨 별점인지 안보여줌 이거만 고치면 될거 같은데
    // 자꾸 한개를 고치면 한개가 망가짐
  };

  // 댓글 삭제 모달창 불러오기 + 현재 타켓 아이디 저장
  const passwordShowModal = (event: ChangeEvent<HTMLButtonElement>) => {
    setIsOpen((prev) => !prev); // 트루가 되면서 모달창이 열어진다!
    setDePasswordId(event.target.id); // 타겟 댓글창 아이디를 저장
    // console.log(passId);
  };

  // 댓글 삭제 모달창 안에 인풋 값 저장
  function onPasswordCheck(event: ChangeEvent<HTMLInputElement>) {
    setDePassword(event.target.value);
  }

  // 현 댓글 삭제하는 버튼
  const onClickDeleteCommentsButton = async (
    event: MouseEvent<HTMLDivElement>
  ) => {
    // const pass = prompt("비밀번호를 입력하세요!"); // 구버전 방식

    await deleteBoardComments({
      variables: {
        boardCommentId: dePasswordId,
        password: dePassword,
      },
    });

    router.push("/boards/board/" + router.query.num); // 난 이렇게 새로고침을 하였는데 멘토님은 리패치쿼리를 통해서 다시 화면에 보이게 했음
    setIsOpen((prev) => !prev); // 모달창에서 확인 누르면 펄스가 되면서 모달창 사라짐
    setDePassword(""); // 비밀번호값 초기화
  };

  // 댓글 작성값 불러오기
  const writerCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.currentTarget.value);
  };

  // 댓글 패스워드 확인
  const passwordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 댓글 내용 확인과 내용 불러오기, 또 길이 체크
  const contentsCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
    setLength(event.target.value.length);
  };

  // 유저가 적은 별점 저장
  function onStarCheck(star: number) {
    setRating(star);
  }

  // 댓글 생성 버튼!!
  const onClickCreateCommentsButton = async () => {
    if (writer && password && contents) {
      const result = await createBoardComments({
        variables: {
          boardId: router.query.num,
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating,
          },
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.num },
          },
        ],
      });

      // router.push("/boards/board/" + router.query.num);
      setWriter("");
      setPassword("");
      setContents("");
      setRating(0);
    } else {
      alert("공백입니다.");
    }
  };

  // 무한 스크롤 이벤트
  const onLoadMore = () => {
    if (CommentsData === undefined) return;
    fetchMore({
      variables: {
        page:
          Math.ceil((CommentsData?.fetchBoardComments.length ?? 10) / 10) + 1,
      }, //10개의 단위로 1페이지로 나누거라~
      updateQuery: (prev, { fetchMoreResult }) => {
        // console.log(prev);
        if (fetchMoreResult.fetchBoardComments === undefined) {
          // 만약 다음 댓글이 없다면 이전 댓글만 보여줘라~
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
          // 전체 댓글: 이전 댓글들 + 다음 댓글들
        };
      },
    });
  };

  return (
    <>
      <BoardCommentUI
        setUpRating={setUpRating}
        upRating={upRating}
        upRatingCheck={upRatingCheck}
        upLength={upLength}
        upLengthBoolean={upLengthBoolean}
        upContentsCheck={upContentsCheck}
        upPasswordCheck={upPasswordCheck}
        onClickUpdateCommentsButton={onClickUpdateCommentsButton}
        onLoadMore={onLoadMore}
        onPasswordCheck={onPasswordCheck}
        isOpen={isOpen}
        passwordShowModal={passwordShowModal}
        dePassword={dePassword}
        length={length}
        writer={writer}
        password={password}
        contents={contents}
        CommentsData={CommentsData}
        onStarCheck={onStarCheck}
        // setStar={setRating}
        rating={rating}
        onClickDeleteCommentsButton={onClickDeleteCommentsButton}
        writerCheck={writerCheck}
        passwordCheck={passwordCheck}
        contentsCheck={contentsCheck}
        onClickCreateCommentsButton={onClickCreateCommentsButton}
        onClickUpdateCommentsWindowButton={onClickUpdateCommentsWindowButton}
        myIndex={myIndex}
      ></BoardCommentUI>
    </>
  );
}
