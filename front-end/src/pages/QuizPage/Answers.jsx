import React, { useContext } from 'react';
import Answer from './Answer';
import QuizContext from './QuizContext';

const Answers = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { currentAnswer, currentQuestion, quizs } = state;
  const question = quizs[currentQuestion];
  return (
    <>
      <Answer letter="a" answer={question.a} dispatch={dispatch} selected={currentAnswer === 'a'} />
      <Answer letter="b" answer={question.b} dispatch={dispatch} selected={currentAnswer === 'b'} />
      <Answer letter="c" answer={question.c} dispatch={dispatch} selected={currentAnswer === 'c'} />
      <Answer letter="d" answer={question.d} dispatch={dispatch} selected={currentAnswer === 'd'} />
    </>
  );
};

export default Answers;
