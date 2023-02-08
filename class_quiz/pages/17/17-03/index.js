import axios from "axios";
import { useEffect, useState } from "react";

export default function abcPage() {
  const [dog, setDog] = useState("");

  useEffect(() => {
    const onClickSync = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDog(result.data.message);
    };

    onClickSync();
  }, []);

  return (
    <>
      <div>
        <img src={dog}></img>
      </div>
    </>
  );
}
