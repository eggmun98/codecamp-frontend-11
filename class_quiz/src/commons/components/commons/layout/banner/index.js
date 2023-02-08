import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  width: 0 auto;
  height: 500px;
  background-color: whitesmoke;
`;

const Qqq = styled(Slider)`
  width: 100%;
  margin: 0 auto;
`;

const Img = styled.img`
  margin: 0 auto;
  object-fit: cover;
  height: 400px;
`;

export default function BannerPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <h2> 여기는 Banner입니다.</h2>
      <Qqq {...settings}>
        <div>
          <Img src="abc.png"></Img>
        </div>
        <div>
          <Img src="abcd.png"></Img>
        </div>
        <div>
          <Img src="abcde.png"></Img>
        </div>
        <div>
          <Img src="abcdef.png"></Img>
        </div>
      </Qqq>
    </Wrapper>
  );
}
