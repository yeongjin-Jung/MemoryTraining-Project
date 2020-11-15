import React, { useContext } from 'react';
import QuizContext from './QuizContext';
const Question = (props) => {
  const { state } = useContext(QuizContext);
  const { currentQuestion, quizs } = state;
  const question = quizs[currentQuestion];
  // //수정 console.log(currentQuestion);
  // //수정 console.log(quizs);
  return <p>{question.question}</p>;
};

export default Question;
