import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { useAmp } from "next/amp";
import { useRouter } from "next/router";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { IMutation, IQuery } from "../../types/generated/types";
import { useMoveToPageMode } from "../../hooks/customs/useMoveToPageMode";
import { useRecoilState } from "recoil";
import { storeGetBaskets } from "../../../../commons/stores";

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 0px;
  color: #489bb0;
  /* background-color: #489bb0; */
  /* background-color: #5321d0;  */
  /* background-color: #282424;  */
  /* background-color: #2a2626; */
`;

const logomove = keyframes`
  0%{
    transform: translate(0px, 0px)
  }
  30%{
    transform: translate(0px, -20px)
  }
  40%{
    transform: translate(0px, 0)
  }
  50%{
    transform: translate(0px, -10px)
  }
  60%{
    transform: translate(0px,  0px)
  }
  70%{
    transform: translate(0px, -10px)
  }
 
  80%{
    transform: translate(0px, 0px)
  }
  90%{
    transform: translate(0px, -10px)
  }
  

  100%{
    transform: translate(0px, 0px)
  }


`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 12px;
  margin-top: 25px;
  animation: ${logomove} 1s ease-out alternate;
`;

const LogoTitle = styled.div`
  font-size: 30px;
  font-weight: 700;

  margin-top: 50px;
`;

const RightWrapper = styled.div`
  margin-top: 50px;
`;

const Login = styled.button`
  font-weight: 700;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: white;
`;

const SighUp = styled.button`
  padding: 10px 16px;
  font-weight: 700;
  font-size: 16px;
  margin-left: 20px;
  background-color: white;
  border: none;
`;

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
      _id
    }
  }
`;

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export default function HeaderPage() {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const { onClickMoveToPage } = useMoveToPageMode();

  const client = useApolloClient();

  const onClickButton = async (): Promise<void> => {
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
  };

  const [logout_user] = useMutation<Pick<IMutation, "logoutUser">>(LOGOUT_USER);

  const logoutButton = async () => {
    try {
      await logout_user();
      alert("로그아웃 하였습니다.");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  const [getBaskets, setGetBaskets] = useRecoilState(storeGetBaskets);

  return (
    <>
      <Wrapper>
        <LeftWrapper onClick={onClickMoveToPage("/boards")}>
          <div>{getBaskets}</div>

          <LogoTitle>Precious Time</LogoTitle>
        </LeftWrapper>
        <RightWrapper>
          {data?.fetchUserLoggedIn.name ? (
            <>
              <Login onClick={onClickMoveToPage("/markets/userPage")}>
                프로필
              </Login>
              <div>{data?.fetchUserLoggedIn.name}님 환영합니다</div>
              <button onClick={logoutButton}>로그아웃</button>
            </>
          ) : (
            <>
              <Login onClick={onClickMoveToPage("/sign/signin")}>로그인</Login>
              <SighUp onClick={onClickMoveToPage("/sign/signup")}>
                회원가입
              </SighUp>
            </>
          )}

          <button onClick={onClickButton}>테스트 버튼</button>
        </RightWrapper>
      </Wrapper>
    </>
  );
}
