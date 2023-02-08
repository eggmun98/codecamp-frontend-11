import { Modal } from "antd";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import type { Address } from "react-daum-postcode";

export default function ModalAlertPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = (): void => {
    setIsOpen((prev) => !prev); // 펄스에서 트루
  };

  // const handleOk = (): void => {
  //   setIsOpen((prev) => !prev); // 위에서 펄스 가져왔으니 트루로 바뀜
  // };

  // const handleCancel = (): void => {
  //   setIsOpen((prev) => !prev); // 트루에서 펄스 <이건 정확하지 않음
  // };

  const handleComplete = (data): void => {
    console.log(data);
    onToggleModal();
  };

  return (
    <>
      {/* 모달 종료방식 1번 모달 숨기는 방법  (ex, 이력서) */}
      {/* <button onClick={onToggleModal}>모달창 열기</button>  */}
      {/* <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete}></DaumPostcodeEmbed>
      </Modal> */}

      {/* 모달 종료방식 2번 모달 숨기는 방법  (ex, 신용카드, 비밀번호 등) */}
      <button onClick={onToggleModal}>모달창 열기</button>
      {isOpen && (
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete}></DaumPostcodeEmbed>
        </Modal>
      )}
    </>
  );
}
