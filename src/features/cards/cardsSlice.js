import { createSlice } from '@reduxjs/toolkit';

const cards = {
  name: "cards",
  initialState: {
    cards: {}
  },
  reducers: {
    addCard: (state, action) => {
      const newCard = action.payload;
      state.cards = {
        ...state.cards,
        [newCard.id]: newCard
      }
    },
    deleteCard: (state, action) => {
      const cardId = action.payload;
      delete state.cards[cardId];
    },
    addCards: (state, action) => {
      state.cards = action.payload;
    },
  }
};

export const cardsSlice = createSlice(cards);
export const selectCards = (state) => {
  return state.cards.cards
}

export const { addCard , deleteCard, addCards} = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;