import { useEffect } from "react";

// 546bab6b1ad8e036b1f679bbb9af2e7c

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage(): JSX.Element {
  useEffect(() => {
    const script = document.createElement("script"); // <script></script> 태그 생성

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=546bab6b1ad8e036b1f679bbb9af2e7c";
    // 문자열 연결시켜주는게 &이거임 // 원래의 주소에서 autoload=false & 이게 추가가됨 자동로드를 꺼놓은거임!

    document.head.appendChild(script); // 스크립태그가 헤드태그 안에 추가가됨!
    // <head><scrip/> </head>

    script.onload = () => {
      // 스크립트 태그를 다운받아 오면은
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 // const map 변수안에 안넣어도 됨!

        // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            // 클릭한 위치에 마커를 표시합니다
            addMarker(mouseEvent.latLng);
          }
        );

        // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
        var markers = [];

        console.log(markers);

        // 마커 하나를 지도위에 표시합니다
        addMarker(new window.kakao.maps.LatLng(33.450701, 126.570667));

        // 마커를 생성하고 지도위에 표시하는 함수입니다
        function addMarker(position) {
          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            position: position,
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          // 생성된 마커를 배열에 추가합니다
          markers.push(marker);
        }

        // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
        function setMarkers(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }

        // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
        function showMarkers() {
          setMarkers(map);
        }

        // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
        function hideMarkers() {
          setMarkers(null);
        }
      });
    };
  }, []);

  return (
    <>
      {/* <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=546bab6b1ad8e036b1f679bbb9af2e7c"
      ></script> */}
      <div id="map" style={{ width: 500, height: 400 }}></div>;
    </>
  );
}

// 노원두 멘토님이 작성한 코드 다른게 있으면 비교해보자
// import Link from "next/link";
// import { useRouter } from "next/router";

// export default function KakaoMapPage(): JSX.Element {
//   const router = useRouter();

//   const onClickMove = (): void => {
//     void router.push("/section25/25-02-kakao-map-routing-moved");
//   };

//   return (
//     <>
//       <button onClick={onClickMove}>페이지 이동하기!!!</button>

//       {/* 매 페이지를 새로 다운로드 받으므로 SPA 활용 못함 */}
//       <a href="/section25/25-02-kakao-map-routing-moved">페이지 이동하기!!!</a>

//       {/* next에서 제공하는 a태그 이므로, SPA 활용 가능 + <a>를 써서 검색 좋아짐 */}
//       <Link href="/section25/25-02-kakao-map-routing-moved">
//         <a>페이지 이동하기!!!</a>
//       </Link>

//       {/* 의미가 있는 시멘틱 태그의 장점 */}
//       <h1>요리</h1>
//       <div>요리</div>
//       <section>요리</section>
//     </>
//   );
// }

//
//
//
//
//

// import { useEffect } from "react";

// declare const window: typeof globalThis & {
//   kakao: any;
// };

// export default function KakaoMapPage(): JSX.Element {
//   useEffect(() => {
//     const script = document.createElement("script"); // <script></script>
//     script.src =
//       "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7c77755781e118847c44446a054e2dd5";
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.kakao.maps.load(function () {
//         const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
//         const options = {
//           // 지도를 생성할 때 필요한 기본 옵션
//           center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
//           level: 3, // 지도의 레벨(확대, 축소 정도)
//         };

//         const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

//         // 마커가 표시될 위치입니다
//         const markerPosition = new window.kakao.maps.LatLng(
//           33.450701,
//           126.570667
//         );

//         // 마커를 생성합니다
//         const marker = new window.kakao.maps.Marker({
//           position: markerPosition,
//         });

//         // 마커가 지도 위에 표시되도록 설정합니다
//         marker.setMap(map);
//       });
//     };
//   }, []);

//   return (
//     <>
//       {/* <script
//         type="text/javascript"
//         src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7c77755781e118847c44446a054e2dd5"
//       ></script> */}
//       <div id="map" style={{ width: 500, height: 400 }}></div>
//     </>
//   );
// }
