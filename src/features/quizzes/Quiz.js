import { Link, useParams, useHistory } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { selectQuizzes, deleteQuiz} from './quizzesSlice.js'
import { deleteCard } from "../cards/cardsSlice.js";
import { deleteQuizFromTopic } from "../topics/topicsSlice.js";
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuizApi, deleteQuizFromTopicApi, deleteCardApi } from "../../app/api.js";

export default function Quiz() {
  const quizzes = useSelector(selectQuizzes); 
  let { quizId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const quiz = quizzes[quizId];

  const handleClick = async () => {
    if(quiz.cardIds.length > 0){
      for(let i = 0; i <= quiz.cardIds.length ; i++ ){
        const cardId = quiz.cardIds[i];
        dispatch(deleteCard(cardId));
        deleteCardApi(cardId);
      }
      dispatch(deleteQuizFromTopic({quizId, topicId: quiz.topicId}));
      deleteQuizFromTopicApi({quizId, topicId: quiz.topicId});
      deleteQuizApi(quizId);
      dispatch(deleteQuiz(quizId));
      history.push(ROUTES.deletionRoute());
    }else{
      dispatch(deleteQuizFromTopic({quizId, topicId: quiz.topicId}));
      deleteQuizFromTopicApi({quizId, topicId: quiz.topicId});
      deleteQuizApi(quizId);
      dispatch(deleteQuiz(quizId));
      history.push(ROUTES.deletionRoute());
    }

  }

  if(quiz){
    return (
      <section>
        <h1>{quiz.name}</h1>
        <ul className="cards-list">
          {quiz.cardIds.map((id) => (
            <Card key={id} id={id} />
          ))}
        </ul>
        <Link to={ROUTES.newQuizRoute()} className="button center">
          Create a New Quiz
        </Link>
        <button className="button center" onClick={handleClick}>Delete quiz</button>
      </section>
    );
  }else{
    history.push(ROUTES.quizzesRoute());
    return null;
  }

}
