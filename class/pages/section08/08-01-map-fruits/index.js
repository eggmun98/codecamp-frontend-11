// 컴포넌트 위에 만든 이유: 컴포넌트가 리렌더링돼도 다시 안만들어짐 즉 리렌더링 반복을 피하기 위해서 위에 만듬 즉 효율적이다.
const FRUITS = [
  { number: 1, title: "레드향" }, // <div>1 레드향</div>
  { number: 2, title: "샤인머스켓" }, // <div>2 샤인머스켓</div>
  { number: 3, title: "산청딸기" },
  { number: 4, title: "한라봉" },
  { number: 5, title: "사과" },
  { number: 6, title: "애플망고" },
  { number: 7, title: "딸기" },
  { number: 8, title: "천혜향" },
  { number: 9, title: "과일선물세트" },
  { number: 10, title: "귤" },
];

// 만약 아래 함수가 작동을 한다면 저 위의 배열이 함수안에 있다면 함수가 작동할 때마다 계속 리렌더링 되는거다!!
// 그래서 위에 두는게 효율적이긴 하다!!

export default function MapFruitsPage() {
  // 1. 가장 기본 예제
  const aaa = [
    <div>1 레드향</div>,
    <div>2 샤인머스켓</div>,
    <div>3. 산청딸기</div>,
  ];

  // 2. 실무 백엔드 데이터 예제
  const bbb = FRUITS.map((el) => (
    <div>
      {el.number} {el.title}
    </div>
  ));

  return (
    <div>
      1. 가장 기본 예제
      <div>{aaa}</div>
      ========================= 2. 실무 백엔드 데이터 예제
      <div>{bbb}</div> ===========================
      <div>
        3. 실무 적인 예제
        {FRUITS.map((el) => (
          <div>
            {el.number} {el.title}
          </div>
        ))}
      </div>
    </div>
  );
}
