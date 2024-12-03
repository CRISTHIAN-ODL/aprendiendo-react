import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/square";
import { TURNS } from "./constants";
import { checkWinnerForm, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(()=> {
    console.log("Inicializar estado del board");
    const boardFromStorage = window.localStorage.getItem("board");
    if(boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(()=> {
    console.log("Inicializar estado del turno");
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null); // null no hay ganador, false empate
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }

  const updateBoard = (index) => {
    //No actualizamos est aposición si ya tiene algo
    if(board[index] || winner) return;
    //Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O: TURNS.X;
    setTurn(newTurn);
    //guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });
    //comprobar si hay ganador
    const newWinner = checkWinnerForm(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner);
      //alert(`El ganador es ${newWinner}`)
    } else if(checkEndGame(newBoard)){
      setWinner(false);      
    }
  };

  useEffect(()=>{
    console.log("useEffect");
  }, [turn]);

  return (
  <main className='board'>
    <h1>Tic Tac Toe</h1>
    <button onClick={resetGame}>Reiniciar el juego</button>
    <section className='game'>
      {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
            </Square>
          )
        })
        }
    </section>  

    <section className="turn">
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
     <WinnerModal resetGame={resetGame} winner={winner}/>

  </main>
  )
}

export default App
