import { useContext } from "react";
import { BoardContext } from "../store/boardContext";

export default function GameBoard() {
  const { board, 
    legalMove, 
    handClickButton, 
    getChessClass 
  } = useContext(BoardContext);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-5">
      <div>
        <ul className="flex flex-col space-y-0.5 sm:space-y-1">
          {board.map((row, rowIndex) => (
            <li key={rowIndex}>
              <ul className="flex space-x-0.5 sm:space-x-1">
                {row.map((cell, cellIndex) => (
                  <li
                    key={cellIndex}
                    className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center border bg-gray-300 hover:border-stone-500 ${legalMove[rowIndex][cellIndex] ? "animate-pulse border-2 border-green-500 rounded-md" : "rounded-md"
                      }`}>
                    <button
                      className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full ${getChessClass(cell)}`}
                      onClick={() => handClickButton(rowIndex, cellIndex)}>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
