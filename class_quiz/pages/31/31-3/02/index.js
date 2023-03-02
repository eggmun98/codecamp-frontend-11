import { useEffect, useState } from "react";

const ramen = [
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

// const ramen = ["/01.jpeg"];
export default function RamenPage() {
  useEffect(() => {
    ramen.map((el, index) => {
      const image = new Image();
      console.log("image는 무엇인가", image);
      image.src = ramen[index];
      // ramen.push(image)
      console.log("image.src는 무엇인가", image.src);
      image.onload = () => {
        ramen.push(image);
        console.log();
        console.log("ondload안에 있는 image는 무엇인가", image);
      };
    });
  }, []);

  //   useEffect(() => {
  //     ramen.map((el, index) => {
  //       const image = new Image();
  //       console.log("image는 무엇인가", image);
  //       image.src = ramen;
  //       console.log("image.src는 무엇인가", image.src);
  //       image.onload = () => {
  //         ramen.push(image);
  //       };
  //     });
  //   }, []);

  const [qqq, setQqq] = useState(0);

  const onClikeImage = () => {
    setQqq(1);
  };

  return (
    <>
      <button onClick={onClikeImage}>이미지 보여라</button>
      {qqq === 1 ? ramen.map((el) => <img src={el} />) : ""}

      {/* <img src={ramen[0]}></img> */}
    </>
  );
}
