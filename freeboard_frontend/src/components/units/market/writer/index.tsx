import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useMutationItemCreate } from "../../../commons/hooks/mutations/product/useMutationItemCreate";
import { useMutationItemUpdate } from "../../../commons/hooks/mutations/product/useMutationItemUpdate";
import { useAuth } from "../../../commons/hooks/customs/useAuth";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

declare const window: typeof globalThis & {
  kakao?: any;
};

export default function MarketWriterPage(props) {
  useAuth();

  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [create_used_item] = useMutationItemCreate();
  const [update_used_item] = useMutationItemUpdate();
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const fileRef = useRef(null);
  console.log("이미이유알엘스", imageUrls);
  const [upload_file] = useMutation(UPLOAD_FILE);
  const [isOpen, setIsOpen] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  // 실질적인 이미지 버튼
  const onChangeImageUpload = async (event) => {
    const file = event.target.files?.[0];
    console.log("file은 어떻게? :", event.target.files);
    const result = await upload_file({
      variables: { file: file },
    });
    // setImageUrls(result.data?.uploadFile.url);
    onChangeImageUrls(result.data?.uploadFile.url, Number(event.target.id));
    // console.log("result.data.", result.data.uploadFile.url);
    console.log("이벤트 타겟 아이디:", event.target.id);
  };

  // 숨겨진 이미지 버튼
  const onClickImageNonoMode = () => {
    fileRef.current?.click();
  };

  // 이미지 버튼 함수
  const onChangeImageUrls = (imageUrl: string, index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = imageUrl;
    setImageUrls(newImageUrls);
    // console.log(index);
    // console.log(imageUrl);
    console.log(imageUrls);
  };

  // 상품 등록 버튼
  const onClickCreateProduct = async (data) => {
    console.log(data);
    const result = await create_used_item({
      variables: {
        createUseditemInput: {
          name: data.name,
          remarks: data.remarks,
          price: Number(data.price),
          contents: data.contents,
          images: [...imageUrls],
        },
      },
    });
    alert("상품 등록하였습니다.");
    // console.log("result :", result);
    router.push("/markets/market/" + result.data.createUseditem._id);
  };

  // 상품 수정 버튼
  const onClickUpdateProduct = async (data) => {
    console.log("상품 수정 데이터", data);
    try {
      const result = await update_used_item({
        variables: {
          updateUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            price: Number(data.price),
            contents: data.contents,
          },
          useditemId: router.query.number,
        },
      });

      alert("상품 수정하였습니다.");
      router.push("/markets/market/" + result.data?.updateUseditem._id);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  //

  //

  //

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=546bab6b1ad8e036b1f679bbb9af2e7c&libraries=services";

    document.head.appendChild(script);

    script.onload = () => {
      // 스크립트 태그를 다운받아 오면은
      window.kakao.maps.load(function () {
        let mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

        let map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new window.kakao.maps.InfoWindow({
              content: address,
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      });
    };
  }, [address]);

  //

  //

  //

  const handleComplete = (boardData: any) => {
    addressShowModal();
    console.log(boardData);
    setAddress(boardData.address);
    setZipcode(boardData.zonecode);
    // setZipcode(data.zipcode);
  };

  const addressShowModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=546bab6b1ad8e036b1f679bbb9af2e7c&libraries=services"
      ></script> */}
      <form
        onSubmit={
          props.isEdit
            ? handleSubmit(onClickUpdateProduct)
            : handleSubmit(onClickCreateProduct)
        }
      >
        상품명: <input {...register("name")}></input>
        부가 상품명: <input {...register("remarks")}></input>
        가격: <input {...register("price")}></input>
        상품 설명: <input {...register("contents")}></input>
        {imageUrls.map((el, index) => (
          <div key={uuidv4()} style={{ margin: 30 }}>
            <div>이미지 등록</div>
            <img
              style={{ width: 50, height: 50, backgroundColor: "black" }}
              onClick={onClickImageNonoMode}
              src={"https:/storage.googleapis.com/" + imageUrls[index]}
            ></img>
            {/* <img src={"https:/storage.googleapis.com/" + imageUrls[index]}></img>  */}
            <input
              type="file"
              id={String(index)}
              // style={{ display: "none" }}
              onChange={onChangeImageUpload}
            ></input>
          </div>
        ))}
        <div style={{ display: "flex" }}>
          <div id="map" style={{ width: 500, height: 400 }}></div>
          <button
            type="button"
            onClick={addressShowModal}
            style={{ background: "red" }}
          >
            주소창 열기
          </button>
        </div>
        <div id="clickLatlng"></div>
        <button>{props.isEdit ? "상품수정" : "상품등록"}</button>
      </form>
      <div>
        {isOpen && (
          <Modal
            title="주소"
            open={isOpen}
            onOk={addressShowModal}
            onCancel={addressShowModal}
          >
            <DaumPostcodeEmbed onComplete={handleComplete}></DaumPostcodeEmbed>
          </Modal>
        )}
      </div>
    </>
  );
}
