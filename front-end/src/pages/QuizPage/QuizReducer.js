import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
  SET_ALL_WRONG_ANSWERS_TO_BOOKMARKED,
  TOGGLE_BOOKMARK_FLAG,
  SET_BOOKMARKED_QUIZ,
  SET_ALL_TO_UNBOOKMARKED,
} from './types.js';

import axios from 'axios';
import SERVER from '../../api/server';

const handleBookmarked = async (action) => {
  let tmpQuizs = [];

  await axios
    .get(SERVER.BASE_URL + SERVER.ROUTES.getEntireQuizs + action.book.id, {
      params: {
        bookmark: 'True',
      },
    })
    .then((res) => {
      console.log('!REDUCER 안에서의 res: ', res);
      tmpQuizs = [...res.data];
      return tmpQuizs;
    });
};

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

    case SET_ALL_WRONG_ANSWERS_TO_BOOKMARKED:
      console.log('state : ', state);
      console.log('state.answers : ', state.answers);
      // let answers = state.answers;

      let quizs2 = state.quizs;
      let tmp2 = [...quizs2];

      state.answers.map((answer) => {
        if (!answer.isCorrect && tmp2[answer.questionId - 1].card.bookmark_flag == 0) {
          tmp2[answer.questionId - 1].card.bookmark_flag = !tmp2[answer.questionId - 1].card.bookmark_flag;

          axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: action.book.id, card_id: answer.card.id }).then((res) => {
            console.log('BOOKMARK ACTIVATED.');
            console.log(res);
          });
        }
      });

      return {
        ...state,
        quizs: tmp2,
      };

    case SET_ALL_TO_UNBOOKMARKED:
      console.log('SET_ALL_TO_UNBOOKMARKED called.');

      let quiz3 = state.quizs;
      let tmp3 = [...quiz3];
      console.log('tmp3 : ', tmp3);

      state.answers.map((answer) => {
        if (tmp3[answer.questionId - 1].card.bookmark_flag == 1) {
          tmp3[answer.questionId - 1].card.bookmark_flag = 0;

          axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: action.book.id, card_id: answer.card.id } }).then((res) => {
            console.log('UNBOOKMARK ACTIVATED.');
            // quiz.card.bookmark_flag = 0;
            console.log(res);
          });
        }
      });
      return {
        ...state,
        quizs: tmp3,
      };

    // tmp3.map((quiz) => {
    //   console.log('quiz : ', quiz);
    //   if (quiz.card.bookmark_flag == 1) {
    //     axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: action.book.id, card_id: quiz.card.id } }).then((res) => {
    //       console.log('UNBOOKMARK ACTIVATED.');
    //       quiz.card.bookmark_flag = 0;
    //       console.log(res);
    //     });
    //   }
    // });

    case SET_BOOKMARKED_QUIZ:
      return {
        ...state,
        quizs: [...action.newQuizs],
        answers: [],
        currentQuestion: 0,
        currentAnswer: '',
        showResults: false,
        error: '',
      };

    default:
      return state;
  }
}

export default quizReducer;
