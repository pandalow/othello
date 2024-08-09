import { useEffect, useState } from "react";
import { useContext } from "react";
import { BoardContext } from "../store/boardContext";

export default function TwoPlayerVersus() {
    const { 
        blackCounts,
        whiteCounts,
        currentPlayer,
        setAiPlayer,
        blackName,
        whiteName,
        setBlackName,
        setWhiteName
    } = useContext(BoardContext)

    const [isBlackEditing, setIsBlackEditing] = useState(false)
    const [isWhiteEditing, setIsWhiteEditing] = useState(false)

    const buttonStyle = 'p-1 bg-gray-200 rounded-md m-2 text-sm sm:text-base'
    const inputStyle = "p-1 border border-gray-300 w-20 sm:w-32 rounded"

    function handleBlackEditing() {
        setIsBlackEditing((isBlackEditing) => !isBlackEditing)
    }

    function handleWhiteEditing() {
        setIsWhiteEditing((isWhiteEditing) => !isWhiteEditing)
    }

    function handleBlackNameChange(event) {
        setBlackName(event.target.value);
    }

    function handleWhiteNameChange(event) {
        setWhiteName(event.target.value);
    }

    const [blackStyle, setBlackStyle] = useState('')
    const [whiteStyle, setWhiteStyle] = useState('')

    useEffect(() => {
        if (currentPlayer === 'B') {
            setBlackStyle("border border-dashed rounded-lg border-stone-950")
            setWhiteStyle("")
        } else {
            setWhiteStyle("border border-dashed rounded-lg border-stone-950")
            setBlackStyle("")
        }
    }, [currentPlayer])

    return (
        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2">
            <div className="flex flex-col space-y-1 items-center justify-center">
                <div className={`flex flex-row space-x-2 items-center p-2 ${blackStyle}`}>
                    <label htmlFor="blackPlayer">
                        <span className="font-mono font-bold">Black:</span>
                        {isBlackEditing ? (
                            <input
                                type="text"
                                value={blackName}
                                onChange={handleBlackNameChange}
                                className={inputStyle}
                            />) : blackName}
                    </label>
                    {isBlackEditing ? (
                        <button className={buttonStyle} onClick={handleBlackEditing}>
                            Save
                        </button>
                    ) : (
                        <button className={buttonStyle} onClick={handleBlackEditing}>
                            Edit
                        </button>
                    )}
                    <button className={buttonStyle} onClick={() => {
                        setAiPlayer('B')
                        setBlackName("Computer")
                    }}>+AI</button>
                </div>
                <div>
                    <p className="font-sans font-bold text-gray-600">DISCS: {blackCounts}</p>
                </div>
            </div>
            <div className="flex flex-col space-y-1 items-center justify-center">
                <div className={`flex flex-row space-x-2 mb-2 items-center p-2 ${whiteStyle}`}>
                    <label htmlFor="whitePlayer">
                        <span className="font-mono font-bold">White:</span>
                        {isWhiteEditing ? (
                            <input
                                type="text"
                                id="whitePlayer"
                                value={whiteName}
                                onChange={handleWhiteNameChange}
                                className={inputStyle}
                            />
                        ) : whiteName}
                    </label>
                    {isWhiteEditing ? (
                        <button className={buttonStyle} onClick={handleWhiteEditing}>
                            Save
                        </button>
                    ) : (
                        <button className={buttonStyle} onClick={handleWhiteEditing}>
                            Edit
                        </button>
                    )}
                    <button className={buttonStyle} onClick={() => {
                        setAiPlayer('W')
                        setWhiteName("Computer")
                    }}>+AI</button>
                </div>
                <div>
                    <p className="font-sans font-bold text-gray-600">DISCS: {whiteCounts}</p>
                </div>
            </div>
        </div>
    )
}
