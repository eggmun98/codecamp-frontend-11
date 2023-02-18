import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useMutationItemCreate } from "../../../commons/hooks/mutations/product/useMutationItemCreate";
import { useMutationItemUpdate } from "../../../commons/hooks/mutations/product/useMutationItemUpdate";

export default function MarketWriterPage(props) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [create_used_item] = useMutationItemCreate();
  const [update_used_item] = useMutationItemUpdate();

  const onClickCreateProduct = async (data) => {
    console.log(data);
    const result = await create_used_item({
      variables: {
        createUseditemInput: {
          name: data.name,
          remarks: data.remarks,
          price: Number(data.price),
          contents: data.contents,
        },
      },
    });
    alert("상품 등록하였습니다.");
    // console.log("result :", result);
    router.push("/markets/market/" + result.data.createUseditem._id);
  };

  const onClickUpdateProduct = async (data) => {
    console.log("상품 수정 데이터", data);
    try {
      const result = await update_used_item({
        variables: {
          updateUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            price: Number(data.price),
            contents: data.contents,
          },
          useditemId: router.query.number,
        },
      });

      alert("상품 수정하였습니다.");
      router.push("/markets/market/" + result.data?.updateUseditem._id);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <form
      onSubmit={
        props.isEdit
          ? handleSubmit(onClickUpdateProduct)
          : handleSubmit(onClickCreateProduct)
      }
    >
      상품명: <input {...register("name")}></input>
      부가 상품명: <input {...register("remarks")}></input>
      가격: <input {...register("price")}></input>
      상품 설명: <input {...register("contents")}></input>
      <button>{props.isEdit ? "상품수정" : "상품등록"}</button>
    </form>
  );
}
