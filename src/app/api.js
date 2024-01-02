import axios from 'axios';


const addTopicApi = async (details) => {
  const {id, name, icon } = details;
  try {
    const response = await axios.post('http://localhost:8000/topics', {
        topic: {
            id,
            name,
            icon,
            quizIds: []
        }
  });
    return response.data;
  }catch(err){
    return err.response.data;
  }
};

const addQuizToTopicApi = async ({topicId, quizId}) => {
  try {
    const response = await axios.post('http://localhost:8000/topics/addQuiz', {
      topicId,  
      quizId
    });
    return response.data;
  }catch(err){
    return err.response.data;
  }
};

const deleteTopicApi = async (topicId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/topics/${topicId}`);
    return response.data;
  }catch(err){
    return err.response.data;
  }
};

const deleteQuizFromTopicApi = async ({topicId, quizId}) => {
  try {
    const response = await axios.post(`http://localhost:8000/topics/deleteQuiz`, {
      topicId,
      quizId
    });
    return response.data;
  }catch(err){
    return err.response.data;
  }
};

const getTopicsApi = async () => {

  try {
    const response = await axios.get('http://localhost:8000/topics');
    return response.data;
  }catch(err){
    return err.response.data;
  }
};

const addQuizApi = async (details) => {
  const {id, name, topicId, cardIds} = details;
  try {
    const response = await axios.post('http://localhost:8000/quizzes', {
      quiz: {
            id,
            name,
            topicId,
            cardIds
        }
  });
    return response.data;
  }catch(err){
    return {error: err};
  }
};

const getQuizzesApi = async () => {

  try {
    const response = await axios.get('http://localhost:8000/quizzes');
    return response.data;
  }catch(err){
    return {error: err};
  }
};

const deleteQuizApi = async (quizId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/quizzes/${quizId}`);
    return response.data;
  }catch(err){
    return err.response.data;
  }
};

const addCardApi = async (details) => {
  const {id, front, back} = details;
  try {
    const response = await axios.post('http://localhost:8000/cards', {
      card: {
          id,
          front,
          back
        }
  });
    return response.data;
  }catch(err){
    return {error: err};
  }
}

const deleteCardApi = async (cardId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/cards/${cardId}`);
    return response.data;
  }catch(err){
    return err.response.data;
  }
};

const getCardsApi = async () => {

  try {
    const response = await axios.get('http://localhost:8000/cards');
    return response.data;
  }catch (err){
    return {error: err};
  }
}

export {addTopicApi, getTopicsApi, addQuizApi, getQuizzesApi, addCardApi, getCardsApi, addQuizToTopicApi, deleteTopicApi, deleteQuizApi, deleteCardApi, deleteQuizFromTopicApi};