import React from 'react';
import { SET_CURRENT_ANSWER, SET_ERROR } from './types';

const Answer = (props) => {
  let classes = ['answer'];

  const handleClick = (e) => {
    // //수정 console.log(e.target.value);
    props.dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: e.target.value });
    props.dispatch({ type: SET_ERROR, error: '' });
  };

  if (props.selected) {
    // //수정 console.log('안녕');
    classes.push('selected');
  }
  return (
    <button className={classes.join(' ')} value={props.letter} onClick={handleClick}>
      {props.letter} . {props.answer}
      {/* <span className="letter" style={{ fontSize: '1.2em', color: 'blue', paddingTop: '0.4em' }}>
        {props.letter} .{' '}
      </span>
      <span style={{ paddingLeft: '0.5em', fontSize: '1.5em', color: 'black' }}>{props.answer}</span> */}
    </button>
  );
};

export default Answer;
