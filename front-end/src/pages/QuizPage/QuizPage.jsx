import React, { useReducer, useState, useEffect } from 'react';
import './QuizPage.css';
import Progress from './Progress';
import Question from './Question';
import Answers from './Answers';

import { SET_ANSWERS, SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_ERROR, SET_SHOW_RESULTS, RESET_QUIZ, TOGGLE_BOOKMARK_FLAG } from './types';
import quizReducer from './QuizReducer';
import QuizContext from './QuizContext';

import { Button } from 'react-bootstrap';
import { BsBookmark } from 'react-icons/bs';
import { FcBookmark } from 'react-icons/fc';

import axios from 'axios';
import SERVER from '../../api/server';

const CardTestPage = (props) => {
  const quizs = props.history.location.state.quizList;
  console.log('props.history.location.state : ', props.history.location.state);
  useEffect(() => {
    console.log('quizs =>', quizs);
  }, []);

  const initialState = {
    quizs,
    currentQuestion: 0,
    currentAnswer: '',
    correctAnswer: [],
    answers: [],
    showResults: false,
    error: '',
    wrongAnswersIdx: [],
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error, wrongAnswersIdx } = state;

  const question = quizs[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    // console.log('question', question);
    // console.log('answer', answer);

    if (question.answer === answer.answer) {
      return (
        <>
          <span className="correct">정답</span>
        </>
      );
    } else {
      // dispatch({ type: SET_WRONG_ANSWER, idx: currentQuestion });
      return <span className="failed">오답</span>;
    }
  };

  const renderResultData = () => {
    return answers.map((answer) => {
      const question = quizs.find((question) => question.no === answer.questionId);
      return (
        <div className="result-content" key={question.no}>
          <div className="result-content-question">{question.question}</div>
          <div className="result-content-question">{answer.card.word}</div>
          <div className="result-content-result">{renderResultMark(question, answer)}</div>
          <button>
            {/* 북마크 활성화 */}
            {question.card.bookmark_flag == 0 && (
              <BsBookmark
                onClick={() => {
                  console.log('SCRAP BUTTON CLICKED.');

                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: props.history.location.state.book.id, card_id: question.card.id }).then((res) => {
                    console.log('BOOKMARK ACTIVATED.');
                    console.log(res);

                    dispatch({ type: TOGGLE_BOOKMARK_FLAG, quizIdx: question.no - 1 });
                  });
                }}
              />
            )}

            {/* 북마크 해제 */}
            {question.card.bookmark_flag == 1 && (
              <FcBookmark
                onClick={() => {
                  console.log('BOOKMARK DEACTIVATED.');

                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: props.history.location.state.book.id, card_id: question.card.id } }).then((res) => {
                    console.log(res);

                    dispatch({ type: TOGGLE_BOOKMARK_FLAG, quizIdx: question.no - 1 });
                  });
                }}
              />
            )}
          </button>
        </div>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const next = () => {
    const answer = {
      card: question.card,
      questionId: question.no,
      realAnswer: question.answer,
      answer: currentAnswer,
      currentQuestion: currentQuestion,
      isCorrect: question.answer == currentAnswer ? true : false,
    };

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: '답안을 선택해 주세요.' });

      return;
    }
    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

    if (currentQuestion + 1 < quizs.length) {
      dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 });
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showResults) {
    console.log('answers : ', answers);
    console.log('wrongAnswersIdx : ', wrongAnswersIdx);

    renderResultData();

    return (
      <div className="CardTest-root">
        <div className="CardTest-background"></div>
        <div className="Quiz-container">
          <div className="container-result">
            <p>채점 결과</p>
            <div className="align-right">
              <Button>틀린 문제 모두 스크랩하기</Button>
            </div>
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
            <Progress total={quizs.length} current={currentQuestion + 1} />
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
