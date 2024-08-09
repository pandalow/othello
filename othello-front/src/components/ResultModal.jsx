import { useContext, useState, useEffect, useRef } from "react"
import { createPortal } from 'react-dom';
import { BoardContext } from "../store/boardContext"
import styled from "styled-components";

const HeaderOfResult = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 72px;
`;

export default function ResultModal() {
    const dialogRef = useRef()
    const [winner, setWinner] = useState('')
    const [result, setResult] = useState('')
    const { whiteCounts, blackCounts, handleResetGame, gameOver, blackName, whiteName, aiPlayer1, aiPlayer2, gameDuration } = useContext(BoardContext)
    function calculateScore(counts) {
        return counts * gameDuration / 10
    }

    useEffect(() => {
        if (gameOver) {
 
            if (blackCounts - whiteCounts > 0) {
                setResult('win');
            } else if (whiteCounts - blackCounts > 0) {
                setResult('lose');
            } else {
                setResult('draw');
            }
            console.log(aiPlayer1)
            if (aiPlayer1 !== '' || aiPlayer2 !== '') {
                if (blackName !== 'Computer') {
                    const grade = calculateScore(blackCounts-whiteCounts)
                    setWinner("Your AI score is " + grade)
                } else {
                    const grade = calculateScore(whiteCounts-blackCounts)
                    setWinner("Your AI score is " + grade)
                }
            }


            dialogRef.current.showModal();
        }
    }, [gameOver]);

    function handleCloseModal() {
        dialogRef.current.close();
    }

    function handleRematchGame() {
        handleResetGame();
        dialogRef.current.close()
    }
    return createPortal(
        <dialog className="rounded-md backdrop:bg-white/80 backdrop-blur-sm border shadow-xl"
            id="resultDialog"
            ref={dialogRef}>
            <div className="flex flex-col items-center justify-center p-12 space-y-6 rounded-xl">
                <HeaderOfResult>GAME OVER</HeaderOfResult>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-slate-800 to-sky-500 animate-bounce ">{winner}</h2>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-slate-800 to-sky-500 animate-bounce">
                    {blackName}
                    <span className="bg-sky-50 text-stone-800 text-md rounded-md p-1"> {result} </span>
                    {whiteName}
                </h2>                <p className="text-xl font-bold text-gray-700">Final Discs: {blackCounts} : {whiteCounts}</p>
                <div className="flex flex-row space-x-1">
                    <button className="text-lg bg-stone-950 text-white shadow-md hover:bg-stone-700 hover:animate-pulse  rounded-md px-2 py-1" onClick={handleCloseModal}>CLOSE</button>
                    <button className="text-lg bg-stone-950 text-white shadow-md hover:bg-stone-700 hover:animate-pulse rounded-md px-2 py-1" onClick={handleRematchGame}>REMATCH</button>
                </div>
            </div>

        </dialog>, document.getElementById('modal')
    )
}
