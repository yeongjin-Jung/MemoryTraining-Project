import React, { Component } from 'react';

class ForceUpdateExample extends Component {
  constructor(props) {
    super(props);

    // state 정의
    this.loading = true;
    this.formData = 'no data';

    // 이후 콜백 함수를 다룰 때 bind를 선언하는 부분에 대해 다룹니다.
    this.handleData = this.handleData.bind(this);

    // 4초 후에 handleData를 호출합니다.
    setTimeout(this.handleData, 4000);
  }

  handleData() {
    const data = 'new data';

    // state 변경
    this.loading = false;
    this.formData = `${data} ${this.formData}`;

    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <p>로딩중 : {String(this.loading)}</p>
        <p>결과 : {this.formData}</p>
      </div>
    );
  }
}

export default ForceUpdateExample;
