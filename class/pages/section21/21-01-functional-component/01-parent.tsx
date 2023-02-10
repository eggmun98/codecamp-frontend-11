import ChildPAge from "./02-child";

export default function ParentPAge(): JSX.Element {
  return (
    <>
      {/* <ChildPAge count={10}></ChildPAge> */}
      {ChildPAge({ count: 20 })}
    </>
  );
}
