import * as W from "./BoardWrite.styles";
import { ChangeEvent, MouseEvent } from "react";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { v4 as uuidv4 } from "uuid";
import Uploads01 from "../../../commons/uploads/01/Uploads01.container";
interface IBoardWriteUIProps {
  data?: any;
  isEdit: boolean;
  writerCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  titleCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  contentCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickCreateButton: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdateButton: (event: MouseEvent<HTMLButtonElement>) => void;
  addressShowModal: () => void;
  handleComplete: (data: any) => void;
  addressDetailCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  youtubeUrlCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  error1: string;
  error2: string;
  error3: string;
  error4: string;
  zipcode: string;
  isOpen: boolean;
  address: string;
}

export default function BoardWriteUI(props): JSX.Element {
  return (
    <W.Wrapper>
      <W.Title>{props.isEdit ? "게시글 수정" : "게시글 등록"}</W.Title>
      <W.WriterWrapper>
        <W.LeftBox>
          <W.MainLabel>작성자</W.MainLabel>
          <W.Writer
            type="text"
            placeholder="작성자를 작성해주세요."
            onChange={props.writerCheck}
            defaultValue={props.data?.fetchBoard.writer}
            readOnly={props.data?.fetchBoard.writer}
          ></W.Writer>
          <W.ErrorText>{props.error1}</W.ErrorText>
        </W.LeftBox>
        <W.RightBox>
          <W.Label>비밀번호</W.Label>
          <W.Password
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={props.passwordCheck}
          ></W.Password>
          <W.ErrorText>{props.error2}</W.ErrorText>
        </W.RightBox>
      </W.WriterWrapper>
      <W.SubJectWrapper>
        <W.Label>제목</W.Label>
        <W.SubJect
          type="text"
          placeholder="제목을 작성해주세요."
          onChange={props.titleCheck}
          defaultValue={props.data?.fetchBoard.title}
        ></W.SubJect>
        <W.ErrorText>{props.error3}</W.ErrorText>
      </W.SubJectWrapper>
      <W.ContentsWrapper>
        <W.Label>내용</W.Label>
        <W.Contents
          type="text"
          placeholder="내용을 작성해주세요."
          onChange={props.contentCheck}
          defaultValue={props.data?.fetchBoard.contents}
        ></W.Contents>
        <W.ErrorText>{props.error4}</W.ErrorText>
      </W.ContentsWrapper>
      <W.AddressWrapper>
        <W.Label>주소</W.Label>
        <W.PostalCodeWrapper>
          <W.PostalCode
            placeholder="07250"
            readOnly
            value={
              props.zipcode !== ""
                ? props.zipcode
                : props.data?.fetchBoard.boardAddress?.zipcode ?? ""
            }
          ></W.PostalCode>
          <W.PostalCodeButton type="primary" onClick={props.addressShowModal}>
            주소 검색
          </W.PostalCodeButton>
          {props.isOpen && (
            <Modal
              title="주소"
              open={props.isOpen}
              onOk={props.addressShowModal}
              onCancel={props.addressShowModal}
            >
              <DaumPostcodeEmbed
                onComplete={props.handleComplete}
              ></DaumPostcodeEmbed>
            </Modal>
          )}
        </W.PostalCodeWrapper>
        <W.PostalCodeMain
          readOnly
          value={
            props.address
              ? props.address
              : props.data?.fetchBoard.boardAddress.address ?? ""
          }
        ></W.PostalCodeMain>
        <W.PostalCodeSub
          onChange={props.addressDetailCheck}
          defaultValue={props.data?.fetchBoard.boardAddress.addressDetail}
        ></W.PostalCodeSub>
      </W.AddressWrapper>
      <W.YoutubeWrapper>
        <W.Label>유튜브</W.Label>
        <W.Youtube
          onChange={props.youtubeUrlCheck}
          defaultValue={props.data?.fetchBoard.youtubeUrl}
        ></W.Youtube>
      </W.YoutubeWrapper>
      <W.ImageWrapper>
        <W.Label>사진첨부</W.Label>
        {props.fileUrls.map((el, index) => (
          <Uploads01
            key={uuidv4()}
            index={index}
            fileUrl={el}
            onChangeFileUrls={props.onChangeFileUrls}
          />
        ))}
      </W.ImageWrapper>
      <W.OptionWrapper>
        <W.Label>메인설정</W.Label>
        <W.RadioWrapper>
          <W.RadioButton type="radio" name="opt" id="youtube"></W.RadioButton>
          <W.RadioLabel>유튜브</W.RadioLabel>
          <W.RadioButton type="radio" name="opt" id="image"></W.RadioButton>
          <W.RadioLabel>사진</W.RadioLabel>
        </W.RadioWrapper>
      </W.OptionWrapper>
      <W.SubmitWrapper>
        <W.SubmitButton
          onClick={
            props.isEdit ? props.onClickUpdateButton : props.onClickCreateButton
          }
        >
          {props.isEdit ? "수정하기" : "등록하기"}
        </W.SubmitButton>
      </W.SubmitWrapper>
    </W.Wrapper>
  );
}
