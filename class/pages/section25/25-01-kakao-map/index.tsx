import { useEffect } from "react";

// 546bab6b1ad8e036b1f679bbb9af2e7c

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage(): JSX.Element {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 // const map 변수안에 안넣어도 됨!
  }, []);

  return (
    <>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=546bab6b1ad8e036b1f679bbb9af2e7c"
      ></script>
      <div id="map" style={{ width: 500, height: 400 }}></div>;
    </>
  );
}
