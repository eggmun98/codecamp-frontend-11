const myShopping = [
  { category: "과일", price: 12000 },
  { category: "의류", price: 10000 },
  { category: "의류", price: 20000 },
  { category: "장난감", price: 9000 },
  { category: "과일", price: 5000 },
  { category: "의류", price: 10000 },
  { category: "과일", price: 8000 },
  { category: "의류", price: 7000 },
  { category: "장난감", price: 5000 },
  { category: "의류", price: 10000 },
];
let count = 0;
let bcd = "";
let sum = 0;
const abc = () => {
  for (let key in myShopping) {
    count = count + myShopping[key].price;
    sum++;
  }
  if (sum >= 5) {
    bcd = "Gold";
  } else if (sum <= 2) {
    bcd = "Bronze";
  } else {
    bcd = "Silver";
  }

  return (
    "의류를 구매한 횟수는 총" +
    sum +
    "회 금액은" +
    count +
    "원이며 등급은" +
    bcd +
    "입니다."
  );
};

abc();
