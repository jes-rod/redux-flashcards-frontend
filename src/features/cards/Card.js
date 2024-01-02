import React, { useState} from "react";
import { selectCards } from '../cards/cardsSlice.js'
import { useSelector } from 'react-redux';
import ROUTES from "../../app/routes";
import { useHistory } from "react-router-dom";


export default function Card({ id }) {
  const cards = useSelector(selectCards); 
  const history = useHistory();
  let card;
  if(cards){
    card = cards[id];
  }
  const [flipped, setFlipped] = useState(false);
  

  if(cards){
    
    return (
      <li>
        <button className="card" onClick={(e) => setFlipped(!flipped)}>
          {flipped ? card.back : card.front}
        </button>
      </li>
    );
  }else{
    history.push(ROUTES.quizzesRoute())
  }

}
