import React, { useEffect, useState } from "react";

declare const window: typeof globalThis & {
  kakao?: any;
};

export default function TestPage() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // useEffect(() => {
  //   const watchID = navigator.geolocation.watchPosition(
  //     (position) => {
  //       // 위치 정보를 성공적으로 받아왔을 때 실행되는 콜백 함수
  //       const { latitude, longitude } = position.coords;
  //       console.log("현재 위치: ", latitude, longitude);
  //       setLatitude(latitude);
  //       setLongitude(longitude);
  //     },
  //     (error) => {
  //       // 위치 정보를 받아오지 못했을 때 실행되는 콜백 함수
  //       console.error(error);
  //     },
  //     {
  //       enableHighAccuracy: true, // 높은 정확도의 위치 정보를 사용할지 여부
  //       timeout: 5000, // 위치 정보를 받아오기까지 최대 대기 시간 (밀리초)
  //       maximumAge: 0, // 캐시된 위치 정보의 최대 유효 기간 (밀리초)
  //     }
  //   );

  //   // 위치 정보 수집 중지
  //   return () => {
  //     navigator.geolocation.clearWatch(watchID);
  //   };
  // }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=546bab6b1ad8e036b1f679bbb9af2e7c&libraries=services";

    document.head.appendChild(script);

    script.onload = () => {
      // 스크립트 태그를 다운받아 오면은
      window.kakao.maps.load(function () {
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 10, // 지도의 확대 레벨
          };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도

            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);
          });
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

          var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
            message = "geolocation을 사용할수 없어요..";

          displayMarker(locPosition, message);
        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
          });

          var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          // 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);

          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);
        }
      });
    };
  }, [latitude, longitude]);

  // 위치 정보 수집 중지

  return <div id="map" style={{ width: 500, height: 400 }}></div>;
}
