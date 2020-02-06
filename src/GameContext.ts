import { createContext } from "react";

export type CellState = 0 | "O" | "X"

export type BoardType = [
        CellState, CellState, CellState,
        CellState, CellState, CellState,
        CellState, CellState, CellState
];

export interface State {
    isPlayerTurn: boolean,
    board: CellState[],
    winner: CellState,
    winningCells: number[],
    timer: number,
}

export interface Actions {
    turn(index: number, content: CellState, isWinningTurn?: boolean): void;
    reset(): void;
    increaseTimer(): void;
}

export interface Context {
    state: State,
    actions: Actions,
}

export const defaultContext: Context = {
    state: {
        isPlayerTurn: true,
        winner: 0,
        winningCells: [],
        timer: 0,
        board: [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ],
    },
    actions: {
        turn: () => {},
        reset: () => {},
        increaseTimer: () => {}
    }
};

const GameContext = createContext(defaultContext);
export default GameContext;
