import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";


export default function Deletion() {

  return (
    <section className="center">
      <h1>Deletion successful</h1>
      <Link to={ROUTES.topicsRoute()} className="button">
        See topics
      </Link>
      <Link to={ROUTES.quizzesRoute()} className="button">
        See quizzes
      </Link>
    </section>
  );
}
