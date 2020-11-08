import React from 'react';

const Progress = (props) => {
  return (
    <div className="progress-root">
      <p>
        문제 {props.current} of {props.total}
      </p>
    </div>
  );
};

export default Progress;
