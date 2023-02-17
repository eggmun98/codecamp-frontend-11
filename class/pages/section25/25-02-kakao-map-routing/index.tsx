import Link from "next/link";
import { useRouter } from "next/router";

export default function KakaoMapPage(): JSX.Element {
  const router = useRouter();

  const onClickMove = (): void => {
    void router.push("/section25/25-02-kakao-map-routing-moved");
  };

  return (
    <>
      {/* 싱글 페이지 어플리케이션을 이용한 이동이므로 오류가 생길거임!! 하지만 이게 최신방법이다.
        근데 싱글 페이지 어플리케이션은
      */}
      <button onClick={onClickMove}>페이지 이동하기</button>

      {/* 매 페이지를 새로 다운로드 받으므로 싱글 페이지 어플리케이션 활용 못함!! */}
      <a href="/section25/25-02-kakao-map-routing-moved">
        a태그로 페이지 이동하기
      </a>

      {/* 넥스트가 제공하는 페이지 이동 기능 태그도 싱글 페이지 어플리케이션 버튼으로 이용하니까 
      오류가 생길거임!!
      그리고 지금까지 router 썼지만 Link 태그가 먼저 쓰는게 좋음!
      router은 언제 쓰는냐?? 게시글 등록할 때 상세페이지로 이동할 때
      또 수정 할 때 상세페이지로 이동할 때 그게 아니라면 Link 태그를 이용하는게 좋다
      왜??? Next docs를 보면 Link 태그안에 a태그를 쓰라고 나와 있음 
      그러면 a태그가 무효화가 됨! 즉 그 link 태그안에 a태그를 누르면 싱글 페이지 어플리케이션 기능으로 작동됨
      근데 왜 굳이 link태그안에 적는가?? 브라우저의 검색엔진이 a태그에 주소를 알수 있어서
      즉 관련검색을 하면 우리 페이지가 상단에 나올 수 있다!!
      근데 검색엔진은 자바스크립트를 읽을 줄 모른다 그래서 router.push로 페이지 이동을하면
      못읽으니 검색하면 상단에 나오는게 힘들 수 있다.! 결국 우리는 수업시간 때 div태그를 이용하여
      만들었지만 의미 있는 태그를 사용해야 검색엔진이 잘 본다. 즉 <h1>에 제목을 적고
      그래야 하는게 좋다! */}
      {/* next에서 제공하는 a태그 이므로, spa 활용 가능! + <a>를 써서 검색 좋아짐! */}
      <Link href="/section25/25-02-kakao-map-routing-moved">
        <a>넥스트가 제공하는 태그로 페이지 이동하기</a>
      </Link>
      {/* 의미가 있는 시멘틱 태그의 장점 */}
      <h1>요리</h1>
      <div>요리</div>
      <section>요리</section>
    </>
  );
}
