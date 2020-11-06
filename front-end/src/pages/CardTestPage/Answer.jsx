import React from 'react';
import { SET_CURRENT_ANSWER, SET_ERROR } from './types';

const Answer = (props) => {
  let classes = ['answer'];

  const handleClick = (e) => {
    props.dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: e.target.value });
    props.dispatch({ type: SET_ERROR, error: '' });
  };

  if (props.selected) {
    classes.push('selected');
  }
  return (
    <button className={classes.join(' ')} value={props.letter} onClick={handleClick}>
      <span className="letter">{props.letter} . </span>
      <p>{props.answer}</p>
    </button>
  );
};

export default Answer;
