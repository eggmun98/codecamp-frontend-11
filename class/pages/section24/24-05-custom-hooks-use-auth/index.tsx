import { useAuth } from "../../../src/commons/components/commons/\bhooks/useAuth";

export default function CustomHooksUseAuthPage(): JSX.Element {
  useAuth();

  return <div>프로필 페이지입니다.</div>;
}

// export default 로그인체크(CustomHooksUseAuthPage)  이거 대신 사용할 수 있는게 customHooks
