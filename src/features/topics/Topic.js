import { Link, useParams, useHistory } from "react-router-dom";
import ROUTES from "../../app/routes";

import { selectTopics } from './topicsSlice.js'
import { selectQuizzes, deleteQuiz } from '../quizzes/quizzesSlice.js'
import { deleteTopicApi, deleteQuizApi } from "../../app/api.js";
import { useSelector, useDispatch } from 'react-redux';
import { deleteTopic } from "./topicsSlice.js";



export default function Topic() {

  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes); 
  const dispatch = useDispatch();
  const history = useHistory();
  let { topicId } = useParams();
  const topic = topics[topicId];
  let quizzesForTopic;
  if(topic){
    quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);
  }

  const handleClick = async (e) => {
    try{
      e.preventDefault();
      if(quizzesForTopic.length > 0){
        for(let i = 0; i < quizzesForTopic.length ; i++ ){
          const quizId = quizzesForTopic[i];
          deleteQuizApi(quizId);
          dispatch(deleteQuiz(quizId));
        }
        deleteTopicApi(topicId);
        dispatch(deleteTopic(topicId));
        history.push(ROUTES.deletionRoute());
      }else{
        deleteTopicApi(topicId);
        dispatch(deleteTopic(topicId));
        history.push(ROUTES.deletionRoute());
      }
    }
    catch(error){
      console.log(error);
    }

  }


  if(topic){
    return (
      <section>
        <img src={topic.icon} alt="" className="topic-icon" />
        <h1>Topic: {topic.name}</h1>
        <ul className="quizzes-list">
          {quizzesForTopic.map((quiz) => (
            <div>
              <li className="quiz" key={quiz.id}>
                <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
              </li>
            </div>
  
          ))}
        </ul>
        <Link to="/quizzes/new" className="button center">
          Create a New Quiz
        </Link>
        <button className="button center" onClick={handleClick}>Delete Topic</button>
      </section>
    );
  }else{
    history.push(ROUTES.topicsRoute());
    return null;
  }
}
