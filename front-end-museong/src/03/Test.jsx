import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };

    this.increaseCount = this.increaseCount.bind(this);
  }

  increaseCount() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  render() {
    return (
      <div>
        <p>카운트 : {this.state.count}</p>
        <button onClick={this.increaseCount}>카운트 증가</button>
      </div>
    );
  }
}

export default Test;
