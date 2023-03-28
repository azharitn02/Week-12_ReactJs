import * as React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function Board() {
  const dispatch = useDispatch();
  const squares = useSelector((state) => state.squares);
  const nextValue = useSelector((state) => state.nextValue);
  const winner = useSelector((state) => state.winner);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const next = nextValue === "X" ? "O" : "X";
    dispatch({ type: "SELECT_SQUARE", payload: { square, next } });
  }

  function restart() {
    dispatch({ type: "RESTART" });
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div className=" container flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-extrabold mb-4">Tic-Tac-Toe</h1>
      <div className="status text-2xl font-bold mb-4">{status}</div>
      <div className="board grid">
        <div className="rows">
          <div className="square">{renderSquare(0)}</div>
          <div className="square">{renderSquare(1)}</div>
          <div className="square">{renderSquare(2)}</div>
        </div>
        <div className="rows">
          <div className="square">{renderSquare(3)}</div>
          <div className="square">{renderSquare(4)}</div>
          <div className="square">{renderSquare(5)}</div>
        </div>
        <div className="rows">
          <div className="square">{renderSquare(6)}</div>
          <div className="square">{renderSquare(7)}</div>
          <div className="square">{renderSquare(8)}</div>
        </div>
      </div>
      <button
        className="restart block mx-auto text-2xl font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white mt-8"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <Provider store={store}>
      <div>
        <Board />
      </div>
    </Provider>
  );
}

function App() {
  return <Game />;
}

export default App;
