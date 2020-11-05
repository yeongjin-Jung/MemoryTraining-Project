import React, { useReducer } from 'react';
import './CardTestPage.css';
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

  const initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: '',
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
      return <span className="correct">Corret</span>;
    }
    return <span className="failed">Failed</span>;
  };

  const renderResultData = () => {
    return answers.map((answer) => {
      const question = questions.find((question) => question.id === answer.questionId);
      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
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
      dispatch({ type: SET_ERROR, error: 'please select an option' });

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
            <h2>Results</h2>
            <ul>{renderResultData()}</ul>
            <button className="btn btn-primary" onClick={restart}>
              Restart
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
              Confirm and Continue
            </button>
          </div>
        </div>
      </QuizContext.Provider>
    );
  }
};

export default CardTestPage;
