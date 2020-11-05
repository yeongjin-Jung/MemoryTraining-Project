import React from 'react';
import './CardTestPage.css';
import Progress from './Progress';
import Question from './Question';
import Answers from './Answers';
import { useState } from 'react';

const CardTestPage = () => {
  const [currentQustion, setCurrentQustion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const questions = [
    {
      id: 1,
      question: 'Which statement about Hooks is not true?',
      answer_a: 'Hooks are 100% backwards-compatible and can be used side by side with classes',
      answer_b: 'Hooks are still in beta and not available yet',
      answer_c: "Hooks are completely opt-in, there's no need to rewrite existing code",
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 2,
      question: 'Which one is not a Hook?',
      answer_a: 'useState()',
      answer_b: 'useConst()',
      answer_c: 'useReducer()',
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 3,
      question: 'What Hook should be used for data fetching?',
      answer_a: 'useDataFetching()',
      answer_b: 'useApi()',
      answer_c: 'useEffect()',
      answer_d: 'useRequest()',
      correct_answer: 'c',
    },
  ];

  const question = questions[currentQustion];

  const handleClick = (e) => {
    setCurrentAnswer(e.target.value);
    setError('');
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  const restart = () => {
    setAnswers([]);
    setCurrentAnswer('');
    setCurrentQustion(0);
    setShowResults(false);
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };

    if (!currentAnswer) {
      setError('please select an option');
      return;
    }
    answers.push(answer);
    setAnswers(answers);
    setCurrentAnswer('');

    if (currentQustion + 1 < questions.length) {
      setCurrentQustion(currentQustion + 1);
      return;
    }

    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="CardTest-root">
        <div className="CardTest-background"></div>
        <div className="Quiz-container">
          <div className="container result">
            <h2>Results</h2>
            <button className="btn btn-primary" onClick={restart}>
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="CardTest-root">
        <div className="CardTest-background"></div>
        <div className="Quiz-container">
          <Progress total={questions.length} current={currentQustion + 1} />
          <div className="Quiz-problem">
            <Question question={question.question} />
            {renderError()}
            {/* <h2>In 2016, who won the Formula 1 World Constructor's Championship for the third time in a row?</h2> */}
          </div>
          <div className="Quiz-answer">
            <Answers question={question} currentAnswer={currentAnswer} handleClick={handleClick} />
          </div>
          <button className="btn btn-primary" onClick={next}>
            Confirm and Continue
          </button>
        </div>
      </div>
    );
  }
};

export default CardTestPage;
