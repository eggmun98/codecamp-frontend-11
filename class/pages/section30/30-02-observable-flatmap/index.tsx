// import { Observable } from "@apollo/client";
import { from } from "zen-observable";

export default function ObservaleFlatmpPage(): JSX.Element {
  const onClickButton = (): void => {
    // new Promise((resolve, reject) => {})
    //   new Observable((observer) => {});

    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"]) // fromPromise
      .flatMap((el) => from([`${el} 결과에 qqq 적용`, `${el} 결과에 zzz 적용`]))
      .subscribe((el) => {
        console.log(el);
      });
  };

  return <button onClick={onClickButton}>클릭</button>;
}
