export default function CountLetDacumentPage() {
  function onClickCountUp() {
    const count = Number(document.getElementById("qqq").innerText) + 1;
    document.getElementById("qqq").innerHTML = count;
  }

  function onClickCountDown() {
    const count = Number(document.getElementById("qqq").innerText) - 1;
    document.getElementById("qqq").innerHTML = count;
  }

  return (
    <div>
      <div id="qqq">0</div>
      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
      <button onClick={onClickCountDown}>카운트 내리기!!!</button>
    </div>
  );
}
