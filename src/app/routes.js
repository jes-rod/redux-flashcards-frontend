const ROUTES = {
  newQuizRoute: () => "/quizzes/new",
  quizRoute: (id) => `/quizzes/${id}`,
  quizzesRoute: () => "/quizzes",
  newTopicRoute: () => "/topics/new",
  topicRoute: (id) => `/topics/${id}`,
  topicsRoute: () => "/topics",
  deletionRoute: () => "/deletion",
};

export default ROUTES;
