import React, { useReducer, useState, useEffect } from 'react';
import './QuizPage.css';
import Progress from './Progress';
import Question from './Question';
import Answers from './Answers';

import { SET_ANSWERS, SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_ERROR, SET_SHOW_RESULTS, RESET_QUIZ, TOGGLE_BOOKMARK_FLAG, SET_BOOKMARKED_QUIZ } from './types';
import quizReducer from './QuizReducer';
import QuizContext from './QuizContext';

import { Button } from 'react-bootstrap';
import { BsBookmark } from 'react-icons/bs';
import { FcBookmark } from 'react-icons/fc';

import axios from 'axios';
import SERVER from '../../api/server';

const CardTestPage = (props) => {
  let quizs = props.history.location.state.quizList;
  // console.log('props.history.location.state : ', props.history.location.state);
  useEffect(() => {
    dispatch({ type: 'RESET_QUIZ' });
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
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error, wrongAnswersIdx } = state;

  const question = state.quizs[currentQuestion];

  const handleWrongAnswerToBookmark = () => {
    answers.map((answer) => {
      console.log('answer : ', answer);
    });

    dispatch({ type: 'SET_ALL_WRONG_ANSWERS_TO_BOOKMARKED', book: props.history.location.state.book });
  };

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
    return state.answers.map((answer) => {
      const question = state.quizs.find((question) => question.no === answer.questionId);
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
                  console.log('BOOKMARK BUTTON CLICKED.');

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

  let newQuizs = [];
  const getBookmarkedQuizList = async () => {
    await axios
      .get(SERVER.BASE_URL + SERVER.ROUTES.getEntireQuizs + props.history.location.state.book.id, {
        params: {
          bookmark: 'True',
        },
      })
      .then((res) => {
        // console.log('getBookmarkedQuizList quiz: ', res);
        // setBookmarkedQuizList(res.data);
        console.log('res.data : ', res.data);
        newQuizs = [...res.data];
      });
  };

  const restart = async () => {
    await getBookmarkedQuizList();
    console.log('new quizs : ', newQuizs);

    dispatch({ type: SET_BOOKMARKED_QUIZ, newQuizs: newQuizs });
  };

  const next = () => {
    console.log('currentQuestion : ', currentQuestion);
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

    if (currentQuestion + 1 < state.quizs.length) {
      dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 });
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showResults) {
    console.log('answers : ', answers);
    // console.log('wrongAnswersIdx : ', wrongAnswersIdx);

    renderResultData();

    return (
      <div className="CardTest-root">
        <div className="CardTest-background"></div>
        <div className="Quiz-container">
          <div className="container-result">
            <p>채점 결과</p>
            <div className="align-right">
              <Button onClick={handleWrongAnswerToBookmark}>틀린 문제 모두 스크랩하기</Button>
            </div>
            <ul>{renderResultData()}</ul>
            {/* <button className="restart-btn" onClick={restart}>
              다시 시작
            </button> */}
            <button className="restart-btn" onClick={restart}>
              북마크 단어들만 다시 테스트
            </button>
            <button
              className="restart-btn"
              onClick={() => {
                console.log('돌아가기 button clicked.');
                console.log('props : ', props);
                props.history.push({ pathname: '/set-detail', state: { book: props.location.state.book } });
              }}
            >
              돌아가기
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
            <Progress total={state.quizs.length} current={state.currentQuestion + 1} />
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
