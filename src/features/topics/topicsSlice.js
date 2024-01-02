import { createSlice } from '@reduxjs/toolkit';

const topics = {
  name: "topics",
  initialState: {
    topics: {}
  },
  reducers: {
    addTopic: (state, action) => {
      const newTopic = action.payload;
      newTopic.quizIds = [];
      state.topics = {
          ...state.topics,
          [newTopic.id]: newTopic
      }
    },
    addTopics: (state, action) => {
      state.topics = action.payload;
    },
    addQuizId: (state, action) => {
      const {topicId, quizId} = action.payload;
      state.topics[topicId].quizIds.push(quizId);
    },
    deleteTopic: (state, action) => {
      const topicId = action.payload;
      delete state.topics[topicId];
    },
    deleteQuizFromTopic: (state, action) => {
      const {topicId, quizId} = action.payload;
      state.topics[topicId].quizIds = state.topics[topicId].quizIds.filter((id) => quizId !== id);
    }
  }
};

export const topicsSlice = createSlice(topics);

export const selectTopics = (state) => {
  return state.topics.topics
}

export const { addTopic, addTopics, addQuizId, deleteTopic, deleteQuizFromTopic } = topicsSlice.actions;
export const topicsReducer = topicsSlice.reducer;