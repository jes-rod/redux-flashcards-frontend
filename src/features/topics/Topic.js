import { Link, useParams, useHistory } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useEffect } from "react";
import { selectTopics } from './topicsSlice.js'
import { selectQuizzes, deleteQuiz } from '../quizzes/quizzesSlice.js'
import { selectCards, addCards, deleteCard } from "../cards/cardsSlice.js";
import { deleteTopicApi, deleteQuizApi, getCardsApi, deleteCardApi } from "../../app/api.js";
import { useSelector, useDispatch } from 'react-redux';
import { deleteTopic } from "./topicsSlice.js";



export default function Topic() {

  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes); 
  const cards = useSelector(selectCards);
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
        console.log(quizzesForTopic);
        for(let i = 0; i < quizzesForTopic.length ; i++ ){
          const quiz = quizzesForTopic[i];
          if(quiz.cardIds.length > 0){
            for(let i = 0; i <= quiz.cardIds.length ; i++ ){
              const cardId = quiz.cardIds[i];
              deleteCardApi(cardId).then(()=>dispatch(deleteCard(cardId)));
            }
          }
          deleteQuizApi(quiz.id).then(() => dispatch(deleteQuiz(quiz.id)));
        }
        deleteTopicApi(topicId).then(() => dispatch(deleteTopic(topicId)));
        history.push(ROUTES.topicsRoute());
      }else{
        deleteTopicApi(topicId).then(() => dispatch(deleteTopic(topicId)));      
        history.push(ROUTES.topicsRoute());
      }
    }
    catch(error){
      console.log(error);
    }

  }

  const fetchCards = async () => {
    const result = await getCardsApi();
    const object = result.reduce((prev, card) => ({ ...prev, [card.id]: card}), {}); // transforming array into object to match store syntax
    return object 
  }

  useEffect(() => {
    if(Object.keys(cards).length === 0) {
      fetchCards().then((value) => {
        dispatch(addCards(value));
      });
    }
  }, [])

  if(topic){
    return (
      <section>
        <img src={topic.icon} alt="" className="topic-icon" />
        <h1>Topic: {topic.name}</h1>
        <ul className="quizzes-list">
          {quizzesForTopic.map((quiz) => (
              <li className="quiz" key={quiz.id}>
                <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
              </li>
  
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
