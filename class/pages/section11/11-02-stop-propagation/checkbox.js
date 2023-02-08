export default function Checkbox() {
  const qqq2 = (event) => {
    alert("qqq2");
    event.stopPropagation();
  };
  const qqq3 = (event) => {
    event.stopPropagation();
    alert("qqq3");
  };

  return (
    <span
      onClick={qqq2}
      style={{ width: "500px", height: "300px", backgroundColor: "red" }}
    >
      <input type="checkbox" onClick={qqq3}></input>
    </span>
  );
}
