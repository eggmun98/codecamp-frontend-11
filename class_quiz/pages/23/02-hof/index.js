export default function () {
  const onClickHof = (qqq) => () => {
    console.log(qqq);
  };

  return (
    <>
      <div>
        <button onClick={onClickHof(123)}>버튼입니다</button>
      </div>
    </>
  );
}
