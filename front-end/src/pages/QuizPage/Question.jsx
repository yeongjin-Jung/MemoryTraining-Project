import React, { useContext } from 'react';
import QuizContext from './QuizContext';
const Question = (props) => {
  const { state } = useContext(QuizContext);
  const { currentQuestion, quizs } = state;
  const question = quizs[currentQuestion];
  // console.log(currentQuestion);
  // console.log(quizs);
  return <p>{question.question}</p>;
};

export default Question;
