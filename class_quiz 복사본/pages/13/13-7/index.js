import React, { useState } from "react";
import { Button, Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

const App = () => {
  const [addressText, setAddressText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    console.log(data);
    setAddressText(fullAddress);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        모달열기
      </Button>
      <div>{addressText}</div>
      {isModalOpen && (
        <Modal
          title="주소 저장"
          open={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
};

export default App;
