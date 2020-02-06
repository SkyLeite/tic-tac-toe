import * as React from "react";
import Cell from "./Cell";
import GameContext from "./GameContext";

const Board = () => {
  const gameState = React.useContext(GameContext);

  const rows = gameState.state.board.map((cell, index) => {
    return (<Cell
    state={cell}
    index={index}
    key={index} />)
  })

  return (
    <div>
        <div className="board">
          {rows}
        </div>
    </div>
  )
}

export default Board;
