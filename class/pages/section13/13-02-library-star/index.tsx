// 4단계 방식이다. ( 1부터 4단계순으로 발전을 해왔음 )
import React, { useState } from "react";
import { Rate } from "antd";

export default function App(): JSX.Element {
  const [value, setValue] = useState(3);
  console.log(value);
  return <Rate onChange={setValue} value={value} />;
}

// 3단계 방식
// import React, { useState } from "react";
// import { Rate } from "antd";

// export default function App(): JSX.Element {
//   const [value, setValue] = useState(3);

//   return  (
//     <Rate onChange={ (value: number): any => setValue(value)} value={value} />; // 2단계 방식

//     // <Rate onChange={setValue} value={value} />;
//   )
// }
//
//
//
// 2단계 방식
// import React, { useState } from "react";
// import { Rate } from "antd";

// export default function App(): JSX.Element {
//   const [value, setValue] = useState(3);

//     const onChangeStar = (value: number): any => setValue(value)

//   return  (
//     <Rate onChange={onChangeStar} value={value} />; // 2단계 방식

//     // <Rate onChange={setValue} value={value} />;
//   )
// }
//
//
//
// 1단계 방식
// import React, { useState } from "react";
// import { Rate } from "antd";

// export default function App(): JSX.Element {
//   const [value, setValue] = useState(3);

//     const onChangeStar = (value: number): void => {
//         setValue(value)
//     }

//   return  (
//     <Rate onChange={onChangeStar} value={value} />;

//
//   )
// }
//
//
// 라이브러리 사이트에서 가져온 양식
// import React, { useState } from 'react';
// import { Rate } from 'antd';

// const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

// const App: React.FC = () => {
//   const [value, setValue] = useState(3);

//   return (
//     <span>
//       <Rate tooltips={desc} onChange={setValue} value={value} />
//       {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
//     </span>
//   );
// };

// export default App;
