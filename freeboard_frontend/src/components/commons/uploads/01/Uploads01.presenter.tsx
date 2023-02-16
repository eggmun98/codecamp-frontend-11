import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
} from "./Uploads01.styles";

export default function Uploads01UI(props): JSX.Element {
  return (
    <>
      {/* porps.fileUrl !== "" 이게 바로 사진이 디폴트벨류 대신 쓰는 방법이다 
      따로 디폴트벨류 하는 법 있는데 손이 많이감! 그래서 이방법이 그나마 쉬울거임 */}
      {props.fileUrl !== "" ? (
        <UploadImage
          onClick={props.onClickUpload}
          src={`https://storage.googleapis.com/${props.fileUrl}`}
        />
      ) : (
        <UploadButton onClick={props.onClickUpload} type="button">
          <>+</>
          <>Upload</>
        </UploadButton>
      )}
      <UploadFileHidden
        type="file"
        ref={props.fileRef}
        onChange={props.onChangeFile}
      />
    </>
  );
}

//    fileUrl이 빈값이 아니라면 왼쪽꺼 보여주고 빈값이라면 오른쪽꺼 보여줘
//     이렇게 한다면 오른쪽은 빈값인 상태에서 이미지를 등록하라는 뜻으로 유저에게 나타낼 수 있다.
//     그리고 왼쪽은 이미지 등록이 완료했다는 뜻이다.
//     그리고 이 왼쪽버튼이나 오른쪽 버튼을 누른다면 useRef 훅으로 인한 UploadFileHidden 태그가 실행이 될거임
//      이 태그에서는 onChangeFile 함수가 실행이 되어 이미지 경로가 result에 담기게 되고
//      그 경로를 세분화해서 result.data.uploadFile.url로 여기서 onChangeFileUrlsCheck 함수의
//      매개 변수인 fileUrl의 매개변수안에 result.data.uploadFile.url을 담는다.
//      그리고  또 onChangeFileUrlsCheck함수안에 매개변수인 index안에 BoardWrite.presenter.tsx파일에
//      있는 props.fileUrls.map((el, index) => {}) 여기에 있는 인덱스값을 담는다
