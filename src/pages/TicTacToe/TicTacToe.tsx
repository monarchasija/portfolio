import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaRedo, FaTrophy } from 'react-icons/fa';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;
type Board = Player[];

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (board: Board): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (board: Board): boolean => {
    return board.every(cell => cell !== null);
  };

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        [gameWinner]: prev[gameWinner] + 1
      }));
    } else if (isBoardFull(board)) {
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));
    }
  }, [board]);

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  const getWinningCells = (): number[] => {
    if (!winner) return [];
    
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === winner && board[b] === winner && board[c] === winner) {
        return combination;
      }
    }
    return [];
  };

  const winningCells = getWinningCells();

  return (
    <div className="tic-tac-toe-page">
      <div className="container">
        <div className="game-header">
          <Link to="/projects" className="back-link">
            <FaArrowLeft />
            Back to Projects
          </Link>
          <h1 className="game-title">Tic-Tac-Toe</h1>
          <p className="game-description">
            Classic Tic-Tac-Toe game built with React and TypeScript
          </p>
        </div>

        <div className="game-container">
          <div className="scoreboard">
            <div className="score-item">
              <span className="score-label">Player X</span>
              <span className="score-value">{scores.X}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Draws</span>
              <span className="score-value">{scores.draws}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Player O</span>
              <span className="score-value">{scores.O}</span>
            </div>
          </div>

          <div className="game-status">
            {gameOver ? (
              winner ? (
                <div className="winner-announcement">
                  <FaTrophy className="trophy-icon" />
                  <span>Player {winner} Wins!</span>
                </div>
              ) : (
                <span>It's a Draw!</span>
              )
            ) : (
              <span>Current Player: <strong>{currentPlayer}</strong></span>
            )}
          </div>

          <div className="game-board">
            {board.map((cell, index) => (
              <button
                key={index}
                className={`game-cell ${cell ? 'filled' : ''} ${
                  winningCells.includes(index) ? 'winning-cell' : ''
                }`}
                onClick={() => handleCellClick(index)}
                disabled={gameOver || cell !== null}
              >
                <span className={`cell-content ${cell === 'X' ? 'player-x' : 'player-o'}`}>
                  {cell}
                </span>
              </button>
            ))}
          </div>

          <div className="game-controls">
            <button className="control-button primary" onClick={resetGame}>
              <FaRedo />
              New Game
            </button>
            <button className="control-button secondary" onClick={resetScores}>
              Reset Scores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;