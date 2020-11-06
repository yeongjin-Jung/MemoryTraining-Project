import React, { useContext } from 'react';
import QuizContext from './QuizContext';
const Question = (props) => {
  const { state } = useContext(QuizContext);
  const { currentQuestion, questions } = state;
  const question = questions[currentQuestion];
  console.log(currentQuestion);
  console.log(questions);
  return <p>{question.question}</p>;
};

export default Question;
