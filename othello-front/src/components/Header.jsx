

import styled from 'styled-components';
import TwoPlayerVersus from "./TwoPlayerVersus";
import { useContext } from 'react';
import { BoardContext } from '../store/boardContext';

const Title = styled.h1`
  font-family: 'Playwrite AR', cursive;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 72px
`;

export default function Header() {
    function handleVersus() {
        setIsVersus((prevState) => !prevState)
    }
    const{gameOver,handleResetGame} = useContext(BoardContext)


    return (
        <main className="flex flex-col items-center justify-center mt-12">
            <header >
                <Title>Othello</Title>
                <p className='text-center text-gray-500 text-xs bold border-t'>Produced by Panda-low & Smartd0g</p>
            </header>
            <div>
                <TwoPlayerVersus />
            </div>
            <div>
              <button onClick={handleResetGame} >REMATCH</button>
            </div>

        </main>
    );
}
