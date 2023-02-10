import {
  MainDiv,
  TopDiv,
  BodyDiv,
  BottomDiv,
  TopDiv_a,
  TopDiv_b,
  TopDiv_b_a,
  TopDiv_b_b,
  TopDiv_b_c,
  TopDiv_c,
  TopDiv_c_a,
  TopDiv_c_b,
  BodyDiv_a,
  BodyDiv_a_a,
  BodyDiv_a_b,
  BottomDiv_a,
  BottomDiv_b,
  BottomDiv_a_a,
  BottomDiv_b_a,
  BottomDiv_b_b,
} from "../../styles/phone";

export default function TestPage() {
  return (
    <MainDiv>
      <TopDiv>
        <TopDiv_a src="/Vector.png"></TopDiv_a>
        <TopDiv_b>
          <TopDiv_b_a>마이</TopDiv_b_a>
          <TopDiv_b_b src="/img1.png"></TopDiv_b_b>
          <TopDiv_b_c>임정아</TopDiv_b_c>
        </TopDiv_b>
        <TopDiv_c>
          <TopDiv_c_a>공지사항</TopDiv_c_a>
          <TopDiv_c_a>이벤트</TopDiv_c_a>
          <TopDiv_c_b>FAQ</TopDiv_c_b>
          <TopDiv_c_a>Q&A</TopDiv_c_a>
        </TopDiv_c>
      </TopDiv>
      <BodyDiv>
        <BodyDiv_a>
          <BodyDiv_a_a>Q. 01</BodyDiv_a_a>
          <BodyDiv_a_b>리뷰 작성은 어떻게 하나요?</BodyDiv_a_b>
        </BodyDiv_a>
        <BodyDiv_a>
          <BodyDiv_a_a>Q. 02</BodyDiv_a_a>
          <BodyDiv_a_b>리뷰 수정/삭제는 어떻게 하나요?</BodyDiv_a_b>
        </BodyDiv_a>
        <BodyDiv_a>
          <BodyDiv_a_a>Q. 03</BodyDiv_a_a>
          <BodyDiv_a_b>아이디/비밀번호를 잊어버렸어요</BodyDiv_a_b>
        </BodyDiv_a>
        <BodyDiv_a>
          <BodyDiv_a_a>Q. 04</BodyDiv_a_a>
          <BodyDiv_a_b>회원탈퇴를 하고싶어요.</BodyDiv_a_b>
        </BodyDiv_a>
        <BodyDiv_a>
          <BodyDiv_a_a>Q. 05</BodyDiv_a_a>
          <BodyDiv_a_b>출발지 설정은 어떻게 하나요?</BodyDiv_a_b>
        </BodyDiv_a>
        <BodyDiv_a>
          <BodyDiv_a_a>Q. 06</BodyDiv_a_a>
          <BodyDiv_a_b>비밀번호를 변경하고 싶어요</BodyDiv_a_b>
        </BodyDiv_a>
      </BodyDiv>
      <BottomDiv>
        <BottomDiv_a>
          <BottomDiv_a_a src="/Vector-1.png"></BottomDiv_a_a>
          <BottomDiv_a_a src="/Vector-2.png"></BottomDiv_a_a>
          <BottomDiv_a_a src="/Vector-3.png"></BottomDiv_a_a>
          <BottomDiv_a_a src="/Vector-4.png"></BottomDiv_a_a>
        </BottomDiv_a>
        <BottomDiv_b>
          <BottomDiv_b_a>홈</BottomDiv_b_a>
          <BottomDiv_b_a>잇츠로드</BottomDiv_b_a>
          <BottomDiv_b_a>마이찜</BottomDiv_b_a>
          <BottomDiv_b_b>마이</BottomDiv_b_b>
        </BottomDiv_b>
      </BottomDiv>
    </MainDiv>
  );
}
