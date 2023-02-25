import { gql, GraphQLClient } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  // 새 토큰을 발급받는 함수!!

  // 리플래쉬 토큰을 던지기 위해서는 http가 아니라 https 써야함
  // export const useAuth2 = () => {
  //   console.log(document.cookie);

  //   useEffect(() => {
  //     if (document.cookie === "refreshToken") {
  //     }
  //   });
  // };
  try {
    const graphQLClient = new GraphQLClient(
      "https://backend-practice.codebootcamp.co.kr/graphql",
      {
        credentials: "include",
      }
    ); // 지금 graphQLclinet는 axois처럼 쓸수 있는 graphql-request를 깔았기 때문에 쓸수 있는거!
    const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    console.log("newAccessToken: ", newAccessToken);
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
