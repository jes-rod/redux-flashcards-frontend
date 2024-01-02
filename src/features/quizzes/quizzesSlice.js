import { createSlice } from '@reduxjs/toolkit';
import { addQuizId } from '../topics/topicsSlice.js'

const quizzes = {
  name: "quizzes",
  initialState: {
    quizzes: {}
  },
  reducers: {
    addQuiz: (state, action) => {
      const newQuiz = action.payload;
      console.log({
        ...state.quizzes,
        [newQuiz.id]: newQuiz
      })
      state.quizzes = {
        ...state.quizzes,
        [newQuiz.id]: newQuiz
      }
    },
    addQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    deleteQuiz: (state, action) => {
      const quizId = action.payload;
      delete state.quizzes[quizId];
    }
  }
};

export const quizzesSlice = createSlice(quizzes);
export const thunkAddQuiz = (payload) => {
  return (dispatch) => {
    dispatch(addQuiz(payload));
    dispatch(addQuizId(payload));
  }
}
export const selectQuizzes = (state) => {
  return state.quizzes.quizzes
}

export const { addQuiz, deleteQuiz, addQuizzes} = quizzesSlice.actions;
export const quizzesReducer = quizzesSlice.reducer;