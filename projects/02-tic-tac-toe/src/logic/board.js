import { WINNER_COMBOS } from '../constants'
export const checkWinnerForm = (boardToCheck) => {
  // revisamos todas las cobinaciones ganadoras
  // si es X o es O el que ganó
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // si no ha ganado nadie
  return null
}

export const checkEndGame = (newBoard) => {
  // si todas las posiciones del array newBoard tienen que el square son diferentes a null a terminado el juego
  return newBoard.every((Square) => Square !== null)
}
