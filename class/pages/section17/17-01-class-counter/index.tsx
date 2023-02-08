import { Component } from "react";

export default class ClassCounterPage extends Component {
  // 클래스형은 랜더 함수를 적어야 함

  state = {
    count: 0,
  };

  onClickCountUp = (): void => {
    this.setState({
      // 스테이트가 객체니까 중괄호 쓰는 거 Component에서 셋스테이트를 자체적으로 지원!!

      count: 1,
    });
  };

  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기!!</button>
      </>
    );
  }
}
