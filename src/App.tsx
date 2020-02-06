import React, { useState, useEffect } from 'react';
import './App.css';
import GameContext, { State, Actions, CellState, defaultContext } from './GameContext';
import Board from './Board';
import { cpuTurn, getWinningCells } from './Cpu';
import useInterval from './useInterval';

function App() {
    const [state, setState] = useState<State>({
        isPlayerTurn: true,
        winner: 0,
        winningCells: [],
        timer: 0,
        board: [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ],
    });

    const actions: Actions = {
        turn: (index: number, content: CellState, isWinningTurn = false) => {
            const newBoard = [...state.board];
            newBoard[index] = content;
            const newState: State = {
                ...state,
                isPlayerTurn: !state.isPlayerTurn,
                board: newBoard,
                winner: isWinningTurn ? content : state.winner,
            };

            if (isWinningTurn) {
                const winningCells = getWinningCells(newBoard, content);
                newState.winningCells = winningCells ? winningCells : state.winningCells;
            }

            setState(newState);
        },
        reset: () => setState({
                ...defaultContext.state,
                board: [...defaultContext.state.board]
            }),
        increaseTimer: () => setState({
            ...state,
            timer: state.timer + 1,
        }),
    };

    useEffect(() => {
        if (state.isPlayerTurn === false) {
            setTimeout(cpuTurn, 750, state.board, actions.turn);
        }
    }, [state, actions.turn]);

    useInterval(actions.increaseTimer, 1000);

    return (
        <GameContext.Provider value={{ state, actions }}>
            <Board />
        </GameContext.Provider>
    );
}

export default App;
