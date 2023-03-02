import React, { useEffect, useRef } from "react";
import LazyLoad from "react-lazyload";

function App() {
  const images = [
    "/01.jpeg",
    "/02.jpeg",
    "/03.jpeg",
    "/04.jpeg",
    "/05.jpeg",
    "/06.jpeg",
    "/07.jpeg",
    "/08.jpeg",
    "/09.jpeg",
    "/10.jpeg",
  ];

  const imageRefs = useRef(images.map(() => React.createRef()));

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    imageRefs.current.forEach((imageRef, index) => {
      if (
        imageRef.current &&
        window.innerHeight + window.scrollY > imageRef.current.offsetTop
      ) {
        // 이미지가 보여지는 영역에 들어왔을 때 실행할 코드 작성
        console.log(`Lazy Load Image ${index}`);
      }
    });
  };

  return (
    <div>
      {images.map((image, index) => (
        <LazyLoad key={index} once>
          <img ref={imageRefs.current[index]} src={image} />
        </LazyLoad>
      ))}
    </div>
  );
}

export default App;
