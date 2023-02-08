import { Modal } from "antd";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import type { Address } from "react-daum-postcode";

export default function ModalAlertPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (): void => {
    setIsOpen(true);
  };

  const handleOk = (): void => {
    setIsOpen(false);
  };

  const handleCancel = (): void => {
    setIsOpen(false);
  };

  const handleComplete = (data): void => {
    console.log(data);
    setIsOpen(false);
  };

  return (
    <>
      {/* 모달 종료방식 1번 모달 숨기는 방법  (ex, 이력서) */}
      {/* <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete}></DaumPostcodeEmbed>
      </Modal> */}

      <button onClick={showModal}>모달창 열기</button>
      {/* 모달 종료방식 2번 모달 숨기는 방법  (ex, 신용카드, 비밀번호 등) */}
      {isOpen && (
        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete}></DaumPostcodeEmbed>
        </Modal>
      )}
    </>
  );
}
