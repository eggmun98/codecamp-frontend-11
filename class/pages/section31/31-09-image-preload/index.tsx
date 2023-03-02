import { useRouter } from "next/router";
import { useEffect } from "react";

const qqq = []; // 이게 이 위치에 있어서 이전에 다운 받은 이미지 기록이 남아져서 다음 페이지에 이동을 해도 다시 다운을 안받음
// 이건 사용하지 않는 것들은 여기에 안나두는게 나음 왜? 사용하지 않는 것들도 남으면 메모리 누수임
// 많아질수록 페이지가 느려짐 그러니 조심히 쓰자

// 이거 테스트 할때 이미지 다운 받는데 17초나 걸림 속도제한도 안했는데 그리고 나서 다음페에지로 넘어가보셈
// 그러면 이미지가 바로 나올거임
// 다 다운안받고 그냥 넘어가면 이미지가 바로 안나올거임
export default function ImagePreloadPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/9/96/%22Den_kjekke_gutt%22_-_6._Internasjonale_Akademiske_Vinterleker_%281939%29_%2840200856483%29.jpg";
    img.onload = () => {
      qqq.push(img);
    };
  }, []);

  const onClickMove = (): void => {
    void router.push("/section31/31-09-image-preload-moved");
  };

  return <button onClick={onClickMove}>페이지 이동하기</button>;
}
