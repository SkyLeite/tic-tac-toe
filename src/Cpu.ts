import { Actions, CellState } from "./GameContext";

const isWinningMove = (board: CellState[], index: number, letter: "X" | "O"): boolean => {
    const newBoard = [...board];
    newBoard[index] = letter;
    return (newBoard[6] === letter && newBoard[7] === letter && newBoard[8] === letter) ||
        (newBoard[3] === letter && newBoard[4] === letter && newBoard[5] === letter) ||
        (newBoard[0] === letter && newBoard[1] === letter && newBoard[2] === letter) ||
        (newBoard[6] === letter && newBoard[3] === letter && newBoard[0] === letter) ||
        (newBoard[7] === letter && newBoard[4] === letter && newBoard[1] === letter) ||
        (newBoard[8] === letter && newBoard[5] === letter && newBoard[2] === letter) ||
        (newBoard[6] === letter && newBoard[4] === letter && newBoard[2] === letter) ||
        (newBoard[8] === letter && newBoard[4] === letter && newBoard[0] === letter);
}

export const getWinningCells = (board: CellState[], letter: CellState) => {
    if (board[6] === letter && board[7] === letter && board[8] === letter) {
        return [6, 7, 8];
    } else if (board[3] === letter && board[4] === letter && board[5] === letter) {
        return [3, 4, 5];
    } else if (board[0] === letter && board[1] === letter && board[2] === letter) {
        return [0, 1, 2];
    } else if (board[6] === letter && board[3] === letter && board[0] === letter) {
        return [6, 3, 0];
    } else if (board[7] === letter && board[4] === letter && board[1] === letter) {
        return [7, 4, 1];
    } else if (board[8] === letter && board[5] === letter && board[2] === letter) {
        return [8, 5, 2];
    } else if (board[6] === letter && board[4] === letter && board[2] === letter) {
        return [6, 4, 2];
    } else if (board[8] === letter && board[4] === letter && board[0] === letter) {
        return [8, 4, 0];
    } else {
        return;
    }
}

const isCellFree = (cell: CellState) => cell === 0;

const chooseRandomMove = (board: CellState[], moves: number[]): number | undefined => {
    const possibleMoves = [];
    for (let [index, move] of board.entries()) {
        if (moves.includes(index) && isCellFree(move)) {
            possibleMoves.push(index);
        }
    }

    console.log("moves", possibleMoves);

    if (possibleMoves.length > 0) {
        return getRandom(possibleMoves);
    }
}

const getRandom = (list: any[]) => {
    return list[Math.floor((Math.random() * list.length))];
}

export const cpuTurn = (board: CellState[], turn: Actions["turn"]) => {
    for (let [index, cell] of board.entries()) {
        if (!isCellFree(cell)) continue;

        // Check if we can win on this turn
        if (isWinningMove(board, index, "O")) {
            return turn(index, "O", true);
        }
    }

    for (let [index, cell] of board.entries()) {
        if (!isCellFree(cell)) continue;

        // Check if the player can win on this turn, and block them
        if (isWinningMove(board, index, "X")) {
            return turn(index, "O");
        }
    }

    // Check if a corner is available
    const cornerMoves = [0, 2, 6, 8];
    const randomCorner = chooseRandomMove(board, cornerMoves);
    if (randomCorner !== undefined) {
        return turn(randomCorner, "O");
    }

    // Check if the middle is available
    if (isCellFree(board[4])) {
        return turn(4, "O");
    }

    // Unlucky, pick a random side
    const sideMoves = [1, 3, 5, 7];
    const randomSide = chooseRandomMove(board, sideMoves);
    if (randomSide !== undefined) {
        return turn(randomSide, "O");
    }
}
