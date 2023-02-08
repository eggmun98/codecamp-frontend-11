import { Calendar, theme } from "antd";
import { useState } from "react";
const App = () => {
  const [qqq, setQqq] = useState("");
  const { token } = theme.useToken();
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
    console.log(mode);
    setQqq(value.format("YYYY-MM-DD"));
  };
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <>
      <div style={wrapperStyle}>
        <Calendar fullscreen={false} onChange={onPanelChange} />
      </div>
      {qqq}
    </>
  );
};
export default App;
