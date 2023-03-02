import axios from "axios";
import { useEffect, useState } from "react";

export default function QqqPage() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");

  const myCallback = () => {
    const one = new XMLHttpRequest();
    one.open("get", "http://numbersapi.com/random?min=1&max=200");
    one.send();
    one.addEventListener("load", (res) => {
      const number = res.target.response.split("")[0];

      const two = new XMLHttpRequest();
      two.open("get", "https://koreanjson.com/posts/" + number);
      two.send();
      two.addEventListener("load", (res) => {
        const userId = JSON.parse(res.target.response).UserId;

        const three = new XMLHttpRequest();
        three.open("get", "https://koreanjson.com/posts?userId=" + userId);
        three.send();
        three.addEventListener("load", (res) => {
          const qqq = JSON.parse(res.target.response);
          setNum1(qqq);
        });
      });
    });
  };
  console.log("1", num1);

  const myPromise = () => {
    axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((one) => {
        const number = one.data.split(" ")[0];
        console.log("one", number, one);
        return axios.get("https://koreanjson.com/posts/" + number);
      })
      .then((two) => {
        const userId = two.data.UserId;
        console.log("two", two);
        return axios.get("https://koreanjson.com/posts?userId=" + userId);
      })
      .then((three) => {
        // console.log("three", three.data);
        setNum2(three.data);
      });
  };
  console.log("2", num2);

  const myAsyncAwait = async () => {
    const aaa = await axios.get("http://numbersapi.com/random?min=1&max=200");
    const bbb = await axios.get(
      "https://koreanjson.com/posts/" + aaa.data.split(" ")[0]
    );
    const ccc = await axios.get(
      "https://koreanjson.com/posts?userId=" + bbb.data.UserId
    );
    // console.log(aaa);
    setNum3(ccc.data);
  };
  console.log("3", num3);

  return (
    <div>
      <button onClick={myCallback}>Callback</button>
      <div>{JSON.stringify(num1)}</div>
      <button onClick={myPromise}>Promise</button>
      <div>{JSON.stringify(num2)}</div>
      <button onClick={myAsyncAwait}>Async/Await</button>
      <div>{JSON.stringify(num3)}</div>
    </div>
  );
}
