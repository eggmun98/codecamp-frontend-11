import axios from "axios";
import { useEffect, useState } from "react";

export default function MyPage() {
  const [api, setApi] = useState("");
  const [api2, setApi2] = useState("");

  useEffect(() => {
    const onCLickApi = async () => {
      const result = await axios.get(
        "https://poetrydb.org/title/Ozymandias/lines.json" // https://github.com/thundercomb/poetrydb#readme
      );
      setApi(result.data[0].lines);
      // console.log(result.data);
    };

    const onCLickApi2 = async () => {
      const result2 = await axios.get(
        "http://de1.api.radio-browser.info/json/countries"
      );
      setApi2(result2);
      // console.log(result2);
    };

    onCLickApi();
    onCLickApi2();
  }, []);

  return (
    <>
      <div>
        <div style={{ width: "500px", height: "1000px", margin: "50px" }}>
          {api}
        </div>
      </div>
    </>
  );
}
