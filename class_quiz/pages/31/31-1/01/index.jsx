export default function QqqPage() {
  let countLet = 0;
  const [countState, setCountState] = useState(0);

  const Let = () => {
    console.log(countLet + 1);
    countLet = countLet + 1;
  };

  const State = () => {
    console.log(countState + 1);
    setCountState(countState + 1);
  };

  return (
    <>
      <div>카운트(let): {countLet}</div>
      <button onClick={Let}>카운트(let) +1 올리기</button>

      <div>카운트(state):{countState} </div>
      <button onClick={State}>카운트(state) +1 올리기</button>
    </>
  );
}
