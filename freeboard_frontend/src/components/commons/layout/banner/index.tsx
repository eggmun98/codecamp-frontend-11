import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  text-align: center;
  background-color: #111211;
`;

const SliderBox = styled(Slider)`
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
    // dots: false,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 4000,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 1000,
    // cssEase: "linear",
  };

  return (
    <>
      <Wrapper>
        {/* <SliderBox {...settings}>
          <div>
            <Img src="banner/banner1.jpg"></Img>
          </div>
          <div>
            <Img src="banner/banner5.jpeg"></Img>
          </div>
          {/* <div>
            <Img src="banner/banner3.jpg"></Img>
          </div> */}
        {/* </SliderBox> */}
      </Wrapper>
    </>
  );
}
