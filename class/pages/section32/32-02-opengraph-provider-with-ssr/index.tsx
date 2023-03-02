// 제공자일때 => 네이버, 다음, 쿠팡 등등..

import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { GraphQLClient } from "graphql-request";

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;

// 이 props는 app에서 거치고 받아오기 때문에
// app.tsx에서 pageProps를 써줘야 한다
export default function OpengraphProviderPage(props: any): JSX.Element {
  // const { data } = useQuery(FETCH_USEDITEM, {
  //   variables: { useditemId: "63fd9eccaef9f000281b2ee4" },
  // });
  console.log("zbzbzb", props);
  return (
    <>
      <Head>
        <meta property="og:title" content={props.qqq.name} />
        <meta property="og:description" content={props.qqq.remarks} />
        <meta property="og:image" content={props.qqq.images?.[0]} />
        <meta property="og:qq" content="qq" />
      </Head>
      <div>중고마켓에 오신 것을 환영합니다!(여기는 body입니다.)</div>
    </>
  );
}

// 내장된 함수라서 이름을 바꾸면 안됨 그리고 page에서만 해야함 즉 src 여기서는 하면 안됨!
// 그리고 이 부분은 서버에서만 실행이 됨!! <=> useEffect는 브라우저에서만 실행이 됐었음! 근데 이거는 서버에서만 실행이 됨~!
// 1. getServerSideProps는 이미 존재하는 단어이므로 변경 불가능
// 2. 여기는 서버에서만 실행됨 (프론트엔드 서버프로그램 => webpack 서버프로그램)
export const getServerSideProps = async (): Promise<any> => {
  // 백엔드에 데이터 요청 로직

  console.log("여기는 서버입니다.");

  // 1. 여기서 API 요청
  const graphQLClient = new GraphQLClient(
    "https://backend-practice.codebootcamp.co.kr/graphql"
  );
  const result = await graphQLClient.request(FETCH_USEDITEM, {
    useditemId: "63fd9eccaef9f000281b2ee4",
  });

  // 2. API 요청해서 받은 결과를 리턴!!
  return {
    // 여기서 리턴을 해주면 이 페이지의 props로 넘어가게 됨!! 정확히는 app컴포넌트를 거쳐서 넘어가게 됨
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remakrs: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};

// 각 페이지마다 메타 태그를 넣어주기 위해서 이 코드를 작성했는데 내가 서버를 작동해서 봤을 떄는 메타태그에 내용이 있다.
// 하지만 axois 요청을 통해서 보게 되면 내요잉 없다 그래서 이 코드는 사용을 안한다
// import { gql, useQuery } from "@apollo/client";
// import Head from "next/head";
// import { GraphQLClient } from "graphql-request";

// const FETCH_USEDITEM = gql`
//   query fetchUseditem($useditemId: ID!) {
//     fetchUseditem(useditemId: $useditemId) {
//       _id
//       name
//       remarks
//       images
//     }
//   }
// `;

// export default function OpengraphProviderPage(): JSX.Element {
//   const { data } = useQuery(FETCH_USEDITEM, {
//     variables: { useditemId: "63fd9eccaef9f000281b2ee4" },
//   });

//   return (
//     <>
//       <Head>
//         <meta property="og:title" content={data?.fetchUseditem.name} />
//         <meta property="og:description" content={data?.fetchUseditem.remarks} />
//         <meta property="og:image" content={data?.fetchUseditem.images?.[0]} />
//       </Head>
//       <div>중고마켓에 오신 것을 환영합니다!(여기는 body입니다.)</div>
//     </>
//   );
// }
