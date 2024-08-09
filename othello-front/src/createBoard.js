export default function createBoard() {
    const boardSize = 8;
    const initialBoard = Array.from({
        length: boardSize
    }, () => Array(boardSize).fill(' '));
    initialBoard[3][3] = 'B'; 
    initialBoard[3][4] = 'W'; 
    initialBoard[4][3] = 'W'; 
    initialBoard[4][4] = 'B'; 

    return initialBoard;
}