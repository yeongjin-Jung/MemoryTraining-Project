import React from 'react';

const Progress = (props) => {
  return (
    <div className="progress-root">
      <h2>
        문제 {props.current} of {props.total}
      </h2>
    </div>
  );
};

export default Progress;
