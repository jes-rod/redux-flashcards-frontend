import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectTopics , addTopics} from './topicsSlice.js'
import { getTopicsApi } from "../../app/api.js";
import { useSelector, useDispatch } from 'react-redux';

export default function Topics() {

  let topics = useSelector(selectTopics); 
  const dispatch = useDispatch();

  const fetchTopics = async () => {
    const result = await getTopicsApi();
    const object = result.reduce((prev, topic) => ({ ...prev, [topic.id]: topic}), {}); // transforming array into object to match store syntax
    return object 
  }

  useEffect(() => {
    if(Object.keys(topics).length === 0) {
      fetchTopics().then((value) => {
        dispatch(addTopics(value));
      });
    }
  }, [])




  return (
    <section className="center">
      <h1>Topics</h1>
      <ul className="topics-list">
        {Object.values(topics).map((topic) => (
          <li className="topic" key={topic.id}>
          <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
           <div className="topic-container">
             <img src={topic.icon} alt="" />
             <div className="text-content">
               <h2>{topic.name}</h2>
               <p>{topic.quizIds.length} Quizzes</p>
             </div>
           </div>
         </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newTopicRoute()}
        className="button create-new-topic-button"
      >
        Create New Topic
      </Link>
    </section>
  );
}
