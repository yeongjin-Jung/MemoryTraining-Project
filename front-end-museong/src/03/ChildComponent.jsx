import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChildComponent extends Component {
  render() {
    const { boolValue, numValue, arrayValue, objValue, nodeValue, funcValue } = this.props;
    return (
      <div className="contenxt">
        <p>불리언 값 : {String(boolValue)}</p>
        <p>숫자 값 : {numValue}</p>
        <p>배열 값 : {arrayValue}</p>
        <p>객체 값 : {String(objValue)}</p>
        <p>노드 값 : {nodeValue}</p>
        <p>함수 값 : {String(funcValue)}</p>
      </div>
    );
  }
}

ChildComponent.propTypes = {
  boolValue: PropTypes.bool,
  numValue: PropTypes.number,
  arrayValue: PropTypes.arrayOf(PropTypes.number),
  objValue: PropTypes.object,
  nodeValue: PropTypes.node,
  funcValue: PropTypes.func,
};

export default ChildComponent;
