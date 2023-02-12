import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  z-index: 0;
  /* background-color: #c1b74b;  */
  background-color: #070707;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  padding-left: 30px;
  top: 2000px;
`;

const Text = styled.div``;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1200px;
`;

const LogoImg = styled.img`
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
`;

export default function FooterPage() {
  return (
    <>
      <Wrapper>
        <Text>Copyright ⓒ Seong Jin Mun</Text>
        <Logo>
          <LogoImg src="/footer/velog2.jpeg"></LogoImg>
          <LogoImg src="/footer/git.png"></LogoImg>
        </Logo>
      </Wrapper>
    </>
  );
}
