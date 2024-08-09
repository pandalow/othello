import { createContext, useState, useEffect } from "react";
import createBoard from "../createBoard";
import { getBestMove } from "../service/bestmove";

const direction = [
  { dr: 1, dc: 1 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: 1 },
  { dr: 1, dc: -1 },
  { dr: -1, dc: 1 },
  { dr: -1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: -1, dc: -1 },
];

const initialBoard = createBoard();
const initialPlayer = "B";

export const BoardContext = createContext({
  board: initialBoard,
  legalMove: Array.from({ length: 8 }, () => Array(8).fill(false)),
  currentPlayer: initialPlayer,
  getChessClass: () => "",
  handClickButton: () => {},
  blackCounts: 2,
  whiteCounts: 2,
  gameOver: false,
  handleResetGame: () => {},
  setAiPlayer: () => {},
  blackName: "",
  whiteName: "",
  setBlackName: () => {},
  setWhiteName: () => {},
  gameDuration: 0, // 新增的计时器状态
  aiPlayer1: undefined,
  aiPlayer2: undefined,
});

export default function BoardContextProvider({ children }) {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [legalMove, setLegalMove] = useState(
    updateLegalMoveBoard(initialBoard, initialPlayer)
  );
  const [blackCounts, setBlackCounts] = useState(2);
  const [whiteCounts, setWhiteCounts] = useState(2);
  const [gameOver, setGameOver] = useState(false);
  const [aiPlayer1, setAi1] = useState("");
  const [aiPlayer2, setAi2] = useState("");
  const [blackName, setBlackName] = useState("Player 1");
  const [whiteName, setWhiteName] = useState("Player 2");

  const [startTime, setStartTime] = useState(null); // 记录开始时间
  const [gameDuration, setGameDuration] = useState(0); // 游戏时长
  const [timerInterval, setTimerInterval] = useState(null); // 计时器间隔

  const startTimer = () => {
    const start = Date.now();
    setStartTime(start);
    const interval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - start) / 1000);
      setGameDuration(elapsedTime);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  useEffect(() => {
    // 自动执行 AI 回合
    const makeAiMove = async () => {
      if (
        (aiPlayer1 === currentPlayer || aiPlayer2 === currentPlayer) &&
        !gameOver
      ) {
        await aiMove();
      }
    };
    makeAiMove();
  }, [currentPlayer, aiPlayer1, aiPlayer2, gameOver]);

  async function aiMove() {
    const bestMove = await getBestMove(board, currentPlayer);

    if (bestMove) {
      handClickButton(bestMove[1], bestMove[2]);
    } else {
      console.error("Failed to retrieve best move.");
    }
  }

  function setAiPlayer(ai) {
    if (ai === "B") {
      setAi1(ai); // 设置黑色棋子为 AI 玩家
    } else {
      setAi2(ai); // 设置白色棋子为 AI 玩家
    }
  }

  useEffect(() => {
    const updateLegalMove = updateLegalMoveBoard(board, currentPlayer);
    setLegalMove(updateLegalMove);

    if (!updateLegalMove.some((row) => row.includes(true))) {
      const opponentPlayer = currentPlayer === "B" ? "W" : "B";
      const opponentLegalMove = updateLegalMoveBoard(board, opponentPlayer);

      if (!opponentLegalMove.some((row) => row.includes(true))) {
        setGameOver(true);
        stopTimer(); // 游戏结束时停止计时器
      } else {
        setCurrentPlayer(opponentPlayer);
      }
    }
  }, [board, currentPlayer]);

  function handClickButton(row, col) {
    // 开始游戏时启动计时器
    if (startTime === null) {
      startTimer();
    }

    // 检查当前玩家是否是 AI
    if (
      (board[row][col] !== " " || !legalMove[row][col]) && // 当位置不为空或非法移动
      currentPlayer !== aiPlayer1 && // 当前玩家不是 AI 玩家1
      currentPlayer !== aiPlayer2 // 当前玩家不是 AI 玩家2
    ) {
      return; // 阻止人类玩家的非法移动
    }

    const prevPlayer = currentPlayer;
    setCurrentPlayer((prevState) => (prevState === "B" ? "W" : "B"));

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[row][col] = prevPlayer;
      return flipChess(row, col, prevPlayer, newBoard);
    });
  }

  function flipChess(row, col, currentPlayer, board) {
    const newBoard = board.map((r) => [...r]);
    const opponent = currentPlayer === "B" ? "W" : "B";

    for (const { dr, dc } of direction) {
      let i = row + dr;
      let j = col + dc;
      const path = [];

      while (i >= 0 && i < newBoard.length && j >= 0 && j < newBoard[i].length) {
        if (newBoard[i][j] === " ") {
          break;
        } else if (newBoard[i][j] === opponent) {
          path.push([i, j]);
        } else if (newBoard[i][j] === currentPlayer) {
          for (const [pi, pj] of path) {
            newBoard[pi][pj] = currentPlayer;
          }
          break;
        } else {
          break;
        }
        i += dr;
        j += dc;
      }
    }
    return newBoard;
  }

  function updateLegalMoveBoard(board, currentPlayer) {
    const updatedLegalMove = Array.from({ length: 8 }, () =>
      Array(8).fill(false)
    );

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === " " && isValidMove(board, i, j, currentPlayer)) {
          updatedLegalMove[i][j] = true;
        }
      }
    }
    return updatedLegalMove;
  }

  function isValidMove(board, row, col, currentPlayer) {
    const opponent = currentPlayer === "B" ? "W" : "B";

    for (const { dr, dc } of direction) {
      let r = row + dr;
      let c = col + dc;
      let foundOpponent = false;

      while (r >= 0 && r < board.length && c >= 0 && c < board[row].length) {
        if (board[r][c] === opponent) {
          foundOpponent = true;
        } else if (board[r][c] === currentPlayer) {
          if (foundOpponent) {
            return true;
          }
          break;
        } else {
          break;
        }
        r += dr;
        c += dc;
      }
    }
    return false;
  }

  function getChessClass(currentPlayer) {
    if (currentPlayer === "B") {
      return "shadow-md shadow-black bg-gradient-to-r from-gray-700 via-gray-900 to-black border border-gray-500";
    } else if (currentPlayer === "W") {
      return "shadow-md shadow-black bg-gradient-to-r from-white via-gray-200 to-gray-400 border border-gray-300";
    }
    return " ";
  }

  function handleResetGame() {
    setBoard(createBoard());
    setCurrentPlayer("B");
    setLegalMove(updateLegalMoveBoard(initialBoard, initialPlayer));
    setGameOver(false);
    setStartTime(null);
    setGameDuration(0);
    stopTimer();
  }

  useEffect(() => {
    const blackCount = board.reduce((acc, row) => {
      return acc + row.filter((cell) => cell === "B").length;
    }, 0);
    setBlackCounts(blackCount);

    const whiteCount = board.reduce((acc, row) => {
      return acc + row.filter((cell) => cell === "W").length;
    }, 0);
    setWhiteCounts(whiteCount);
  }, [board]);

  const ctxValue = {
    board,
    currentPlayer,
    legalMove,
    handClickButton,
    getChessClass,
    blackCounts,
    whiteCounts,
    gameOver,
    handleResetGame,
    setAiPlayer,
    blackName,
    whiteName,
    setBlackName,
    setWhiteName,
    gameDuration, // 将游戏时长暴露给上下文
    aiPlayer1,
    aiPlayer2
  };

  return (
    <BoardContext.Provider value={ctxValue}>
      {children}
    </BoardContext.Provider>
  );
}
