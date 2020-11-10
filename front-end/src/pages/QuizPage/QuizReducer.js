import { SET_ANSWERS, SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_ERROR, SET_SHOW_RESULTS, RESET_QUIZ, SET_WRONG_ANSWER, TOGGLE_BOOKMARK_FLAG } from './types.js';

function quizReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: action.currentAnswer,
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.showResults,
      };
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.answers,
      };
    case RESET_QUIZ:
      return {
        ...state,
        answers: [],
        currentQuestion: 0,
        currentAnswer: '',
        showResults: false,
        error: '',
      };

    case SET_WRONG_ANSWER:
      console.log('action.idx : ', action.idx);
      return {
        ...state,
      };

    case TOGGLE_BOOKMARK_FLAG:
      console.log('TOGGLE_BOOKMARK_FLAG called.');
      console.log('state의 quizs : ', state.quizs);
      console.log('quizIdx : ', action.quizIdx);

      let quizs = state.quizs;
      let tmp = [...quizs];
      tmp[action.quizIdx].card.bookmark_flag = !tmp[action.quizIdx].card.bookmark_flag;

      return {
        ...state,
        quizs: tmp,
      };
    default:
      return state;
  }
}

export default quizReducer;
