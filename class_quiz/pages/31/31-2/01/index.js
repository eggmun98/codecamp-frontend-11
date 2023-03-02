import { useMutation } from "@apollo/client";
import { gql } from "graphql-request";
import { useState } from "react";

export default function Quiz3102Page() {
  const [imageUrl, setImageUrl] = useState("");

  const onChangeFile = async (event) => {
    const file = event.target.files?.[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImageUrl(event.target.result);
    };
  };

  return (
    <>
      <input type="file" onChange={onChangeFile}></input>
      <img src={imageUrl}></img>
    </>
  );
}
