import { createStore } from "redux";

const initialState = {
  squares: Array(9).fill(null),
  nextValue: "X",
  winner: null,
};

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// eslint-disable-next-line no-unused-vars
// function calculateNextValue(squares) {
//   return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
// }

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SELECT_SQUARE":
      if (state.winner || state.squares[action.payload.square]) {
        return state;
      }
      const newSquares = [...state.squares];
      newSquares[action.payload.square] = state.nextValue;
      return {
        ...state,
        squares: newSquares,
        nextValue: action.payload.next,
        winner: calculateWinner(newSquares),
      };
    case "RESTART":
      return {
        ...state,
        squares: Array(9).fill(null),
        nextValue: "X",
        winner: null,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
