import axios from "axios";
import { useEffect, useState } from "react";

export default function RestGetPage(): JSX.Element {
  const [dog, setDog] = useState("");

  useEffect(() => {
    const onClickSync = async (): Promise<void> => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      console.log(result.data.message); // 사진 주소
      setDog(result.data.message); // useEffect 안에 안쓰고 밖에 쓰면 계속 리렌더링 돼서 무한루프에 빠질거임 // 이것도 리렌더링 되긴 하지만 딱 한번만 리렌더링 하는게 나음
    };
    void onClickSync();
  }, []);

  return (
    <div>
      <img src={dog}></img>
      {/* <button onClick={onClickSync}>rest-api(동기) 요청하기</button>  */}
    </div>
  );
}

// ReactQuery (rest + graphql) 라이브러리를 사용하게 되면 유즈이펙트 안써도 됨
// ApolloClinet (graphql) 라이브러리를 사용하게 되면 유즈익페트 안써도 됨
