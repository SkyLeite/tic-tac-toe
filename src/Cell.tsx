import * as React from "react";
import GameContext, { CellState } from "./GameContext";

interface Props {
    state: CellState;
    index: number;
}

const Cell: React.FunctionComponent<Props> = ({ state, index }) => {
    const gameState = React.useContext(GameContext);

    let color = state !== 0 ? "red" : "white";
    if (gameState.state.winningCells.includes(index)) {
        color = "green";
    }

    const content = state === 0 ? "" : state;

    const handleClick = () => {
        if (gameState.state.isPlayerTurn &&
            gameState.state.winner === 0 &&
            state === 0
        ) {
            gameState.actions.turn(index, "X", false);
        }
    }

    return (
        <div
            className="cell"
            onClick={handleClick}
            style={{
                backgroundColor: color
            }}>
            <div className="top">{index === 4 ? <Reset /> : <></>}</div>
            <span>{content}</span>
            <div className="bottom">{index === 4 ? <Timer /> : <></>}</div>
        </div>
    )
};

const Timer: React.FunctionComponent = () => {
    const gameState = React.useContext(GameContext);

    const getTime = () => {
        const seconds = gameState.state.timer;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds - minutes * 60;

        return `${minutes}m${remainingSeconds}s`;
    }

    return (
        <span className="timer">Elapsed time: {getTime()}</span>
    )
}

const Reset: React.FunctionComponent = () => {
    const gameState = React.useContext(GameContext);

    const handleClick = (e: any) => {
        e.stopPropagation();
        gameState.actions.reset();
    }

    return (
        <button onClick={handleClick}>Reset</button>
    )
}

export default Cell;
