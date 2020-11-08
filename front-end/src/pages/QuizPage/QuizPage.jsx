import React, { useReducer } from 'react';
import './QuizPage.css';
import Progress from './Progress';
import Question from './Question';
import Answers from './Answers';

import { SET_ANSWERS, SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_ERROR, SET_SHOW_RESULTS, RESET_QUIZ } from './types';
import quizReducer from './QuizReducer';
import QuizContext from './QuizContext';

const CardTestPage = () => {
  const questions = [
    {
      id: 1,
      question: 'Which one is not a Hook?',
      a: 'useState()',
      b: 'useConst()',
      c: 'useReducer()',
      d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 2,
      question:
        'Which one is not a Hook?()useStateuseStateuseStateuseStateuseStateuseStateuseStateuseSta()useStateuseStateuseStateuseStateuseStateuseStateuseStateuseSta()useStateuseStateuseStateuseStateuseStateuseStateuseStateuseSta()useStateuseStateuseStateuseStateuseStateuseStateuseStateuseSta()useStateuseStateuseStateuseStateuseStateuseStateuseStateuseSta',
      a:
        'useState()useStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseStateuseState',
      b: 'useConst()',
      c: 'useReducer()',
      d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 3,
      question: 'What Hook should be used for data fetching?',
      a: 'useDataFetching()',
      b: 'useApi()',
      c: 'useEffect()',
      d: 'useRequest()',
      correct_answer: 'c',
    },
  ];

  const initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: '',
    correctAnswer: [],
    answers: [],
    showResults: false,
    error: '',
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return (
        <>
          <span className="correct">정답</span>
        </>
      );
    }
    return <span className="failed">오답</span>;
  };

  const renderResultData = () => {
    return answers.map((answer) => {
      const question = questions.find((question) => question.id === answer.questionId);
      return (
        <div className="result-content" key={question.id}>
          <div>{question.question}</div>
          <div>{renderResultMark(question, answer)}</div>
        </div>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };
    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: '답안을 선택해 주세요.' });

      return;
    }
    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

    if (currentQuestion + 1 < questions.length) {
      dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 });
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showResults) {
    return (
      <div className="CardTest-root">
        <div className="CardTest-background"></div>
        <div className="Quiz-container">
          <div className="container-result">
            <p>채점 결과</p>
            <ul>{renderResultData()}</ul>
            <button className="restart-btn" onClick={restart}>
              다시 시작
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <div className="CardTest-root">
          <div className="CardTest-background"></div>
          <div className="Quiz-container">
            <Progress total={questions.length} current={currentQuestion + 1} />
            <div className="Quiz-problem">
              <Question question={question.question} />
              {renderError()}
              {/* <h2>In 2016, who won the Formula 1 World Constructor's Championship for the third time in a row?</h2> */}
            </div>
            <div className="Quiz-answer">
              <Answers question={question} currentAnswer={currentAnswer} dispatch={dispatch} />
            </div>
            <button className="Quizbtn Quizbtn-primary" onClick={next}>
              <p>다음 문제</p>
            </button>
          </div>
        </div>
      </QuizContext.Provider>
    );
  }
};

export default CardTestPage;
