export const checkValidationFile = (file: File): boolean => {
  alert("이 함수를 실행하겠습니다!!");
  if (typeof file === "undefined") {
    alert("파일이 없습니다!");
    return false; // 펄스를 반환해서 부모 함수에게 전달할거임! 그러면 부모함수는 펄스일 경우 리턴 아니면 계속 함수실행 할거임
  }

  if (file.size > 5 * 1024 * 1024) {
    // byte가  1024개가 모이면 kb kb가 1024개가 모이면 mb 그래서 5를 곱해준거임 5MB
    alert("파일 용량이 너무 큽니다. (제한: 5MB 까지 가능)");
    return false;
  }

  if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("jpeg 또는 png 파일만 업로드 가능합니다!");
    return false;
  }
  return true;
};

// export const checkValidationFile = (file: File) => {
//     if (typeof file === "undefined") {
//       alert("파일이 없습니다!");
//       return; // 여기에 리턴이 있으면 이 함수만 종료 즉 부모 함수에는 리턴이 안됨!
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       // byte가  1024개가 모이면 kb kb가 1024개가 모이면 mb 그래서 5를 곱해준거임 5MB
//       alert("파일 용량이 너무 큽니다. (제한: 5MB 까지 가능)");
//       return;
//     }

//     if (!file.type.includes("jpeg") && !file.type.includes("png")) {
//       alert("jpeg 또는 png 파일만 업로드 가능합니다!");
//       return;
//     }
//   };
