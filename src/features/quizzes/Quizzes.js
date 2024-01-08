import React , {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectQuizzes, addQuizzes } from './quizzesSlice.js'
import { addCards } from "../cards/cardsSlice.js";
import { useSelector, useDispatch } from 'react-redux';
import { getQuizzesApi, getCardsApi } from "../../app/api.js";

export default function Quizzes() {
  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    const result = await getQuizzesApi();
    const object = result.reduce((prev, quiz) => ({ ...prev, [quiz.id]: quiz}), {}); // transforming array into object to match store syntax
    return object 
  }

  const fetchCards = async () => {
    const result = await getCardsApi();
    const object = result.reduce((prev, card) => ({ ...prev, [card.id]: card}), {}); // transforming array into object to match store syntax
    return object 
  }

  useEffect(() => {
    if(Object.keys(quizzes).length === 0) {
      fetchQuizzes().then((value) => {
        dispatch(addQuizzes(value));
      });
      fetchCards().then((value) => {
        dispatch(addCards(value));
      });
    }
  }, [])

  return (
    <section className="center">
      <h1>Quizzes</h1>
      {Object.keys(quizzes).length === 0 ? <img alt="loading icon" className="h3 text-white p-5" height="50" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" /> : <></>}
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <Link key={quiz.id} to={ROUTES.quizRoute(quiz.id)}>
            <li className="quiz">{quiz.name}</li>
          </Link>
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
    </section>
  );
}
