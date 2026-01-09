import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaRedo, FaLightbulb, FaClock, FaTrophy } from 'react-icons/fa';
import './Sudoku.css';

type SudokuGrid = (number | null)[][];
type Difficulty = 'easy' | 'medium' | 'hard';

const Sudoku: React.FC = () => {
  const [grid, setGrid] = useState<SudokuGrid>(() => Array(9).fill(null).map(() => Array(9).fill(null)));
  const [solution, setSolution] = useState<SudokuGrid>(() => Array(9).fill(null).map(() => Array(9).fill(null)));
  const [initialGrid, setInitialGrid] = useState<SudokuGrid>(() => Array(9).fill(null).map(() => Array(9).fill(null)));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hints, setHints] = useState(3);

  // Generate a complete valid Sudoku grid
  const generateCompleteGrid = (): SudokuGrid => {
    const grid: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(null));
    
    const isValid = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
      // Check row
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
      }
      
      // Check column
      for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
      }
      
      // Check 3x3 box
      const startRow = row - (row % 3);
      const startCol = col - (col % 3);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i + startRow][j + startCol] === num) return false;
        }
      }
      
      return true;
    };

    const fillGrid = (grid: SudokuGrid): boolean => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === null) {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            for (const num of numbers) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (fillGrid(grid)) return true;
                grid[row][col] = null;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    fillGrid(grid);
    return grid;
  };

  // Remove numbers from complete grid to create puzzle
  const createPuzzle = (completeGrid: SudokuGrid, difficulty: Difficulty): SudokuGrid => {
    const puzzle = completeGrid.map(row => [...row]);
    const cellsToRemove = {
      easy: 40,
      medium: 50,
      hard: 60
    }[difficulty];

    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== null) {
        puzzle[row][col] = null;
        removed++;
      }
    }

    return puzzle;
  };

  // Generate new game
  const generateNewGame = () => {
    const completeGrid = generateCompleteGrid();
    const puzzleGrid = createPuzzle(completeGrid, difficulty);
    
    setSolution(completeGrid);
    setGrid(puzzleGrid);
    setInitialGrid(puzzleGrid.map(row => [...row]));
    setSelectedCell(null);
    setIsComplete(false);
    setErrors(new Set());
    setTimer(0);
    setIsRunning(true);
    setHints(difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 1);
  };

  // Check if number placement is valid
  const isValidMove = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (x !== col && grid[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (x !== row && grid[x][col] === num) return false;
    }
    
    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const currentRow = i + startRow;
        const currentCol = j + startCol;
        if ((currentRow !== row || currentCol !== col) && grid[currentRow][currentCol] === num) {
          return false;
        }
      }
    }
    
    return true;
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (initialGrid[row][col] === null && !isComplete) {
      setSelectedCell([row, col]);
    }
  };

  // Handle number input
  const handleNumberInput = (num: number) => {
    if (!selectedCell || isComplete) return;
    
    const [row, col] = selectedCell;
    if (initialGrid[row][col] !== null) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = num;
    
    const errorKey = `${row}-${col}`;
    const newErrors = new Set(errors);
    
    if (!isValidMove(newGrid, row, col, num)) {
      newErrors.add(errorKey);
    } else {
      newErrors.delete(errorKey);
    }
    
    setGrid(newGrid);
    setErrors(newErrors);
    
    // Check if puzzle is complete
    const isGridComplete = newGrid.every(row => row.every(cell => cell !== null));
    const isGridValid = newErrors.size === 0;
    
    if (isGridComplete && isGridValid) {
      setIsComplete(true);
      setIsRunning(false);
    }
  };

  // Clear cell
  const clearCell = () => {
    if (!selectedCell || isComplete) return;
    
    const [row, col] = selectedCell;
    if (initialGrid[row][col] !== null) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = null;
    
    const errorKey = `${row}-${col}`;
    const newErrors = new Set(errors);
    newErrors.delete(errorKey);
    
    setGrid(newGrid);
    setErrors(newErrors);
  };

  // Use hint
  const useHint = () => {
    if (hints <= 0 || !selectedCell || isComplete) return;
    
    const [row, col] = selectedCell;
    if (initialGrid[row][col] !== null) return;

    const correctNumber = solution[row][col];
    if (correctNumber) {
      handleNumberInput(correctNumber);
      setHints(hints - 1);
    }
  };

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedCell || isComplete) return;
      
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) {
        handleNumberInput(num);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        clearCell();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, isComplete]);

  // Generate initial game
  useEffect(() => {
    generateNewGame();
  }, [difficulty]);

  return (
    <div className="sudoku-page">
      <div className="container">
        <div className="game-header">
          <Link to="/projects" className="back-link">
            <FaArrowLeft />
            Back to Projects
          </Link>
          <h1 className="game-title">Sudoku</h1>
          <p className="game-description">
            Fill the 9×9 grid so that each column, row, and 3×3 box contains all digits from 1 to 9
          </p>
        </div>

        <div className="game-container">
          <div className="game-controls">
            <div className="difficulty-selector">
              <label>Difficulty:</label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                disabled={isRunning && timer > 0}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="game-stats">
              <div className="stat">
                <FaClock />
                <span>{formatTime(timer)}</span>
              </div>
              <div className="stat">
                <FaLightbulb />
                <span>{hints} hints</span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="hint-button" onClick={useHint} disabled={hints <= 0 || !selectedCell}>
                <FaLightbulb />
                Hint
              </button>
              <button className="new-game-button" onClick={generateNewGame}>
                <FaRedo />
                New Game
              </button>
            </div>
          </div>

          {isComplete && (
            <div className="completion-message">
              <FaTrophy />
              <span>Congratulations! You solved it in {formatTime(timer)}!</span>
            </div>
          )}

          <div className="sudoku-grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="sudoku-row">
                {row.map((cell, colIndex) => {
                  const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
                  const isInitial = initialGrid[rowIndex][colIndex] !== null;
                  const hasError = errors.has(`${rowIndex}-${colIndex}`);
                  const isHighlighted = selectedCell && 
                    (selectedCell[0] === rowIndex || selectedCell[1] === colIndex ||
                     (Math.floor(selectedCell[0] / 3) === Math.floor(rowIndex / 3) && 
                      Math.floor(selectedCell[1] / 3) === Math.floor(colIndex / 3)));

                  return (
                    <div
                      key={colIndex}
                      className={`sudoku-cell ${isSelected ? 'selected' : ''} ${isInitial ? 'initial' : ''} ${hasError ? 'error' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell || ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="number-pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                className="number-button"
                onClick={() => handleNumberInput(num)}
                disabled={!selectedCell || isComplete}
              >
                {num}
              </button>
            ))}
            <button
              className="clear-button"
              onClick={clearCell}
              disabled={!selectedCell || isComplete}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;