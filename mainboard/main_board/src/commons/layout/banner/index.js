import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  width: 764px;
  height: 240px;
  text-align: center;
  /* background-color: black; */
`;

const SliderBox = styled(Slider)`
  width: 100%;
  margin: 0 auto;
`;

const Img = styled.img`
  margin: 0 auto;
  /* object-fit: cover; */

  width: 764px;
  height: 240px;
  /* color: white;
  font-weight: 800;
  font-size: 50px; */
`;

export default function BannerPage() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Wrapper>
        <SliderBox {...settings}>
          <div>
            <Img src="/banner.png"></Img>
          </div>
          <div>
            <Img src="/banner.png"></Img>
          </div>
          <div>
            <Img src="/banner.png"></Img>
          </div>
        </SliderBox>
      </Wrapper>
    </>
  );
}
