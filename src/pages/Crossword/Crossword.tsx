import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaRedo, FaLightbulb, FaClock, FaTrophy } from 'react-icons/fa';
import './Crossword.css';

interface CrosswordClue {
  id: number;
  clue: string;
  answer: string;
  startRow: number;
  startCol: number;
  direction: 'across' | 'down';
  length: number;
}

interface CrosswordCell {
  letter: string | null;
  isBlack: boolean;
  number?: number;
  userLetter?: string;
}

type CrosswordGrid = CrosswordCell[][];

const Crossword: React.FC = () => {
  const [grid, setGrid] = useState<CrosswordGrid>([]);
  const [clues, setClues] = useState<CrosswordClue[]>([]);
  const [selectedClue, setSelectedClue] = useState<CrosswordClue | null>(null);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hints, setHints] = useState(3);

  // Sample crossword data
  const sampleCrossword = {
    size: 15,
    clues: [
      { id: 1, clue: "Man's best friend", answer: "DOG", startRow: 0, startCol: 0, direction: 'across' as const, length: 3 },
      { id: 2, clue: "Feline pet", answer: "CAT", startRow: 0, startCol: 5, direction: 'across' as const, length: 3 },
      { id: 3, clue: "Flying mammal", answer: "BAT", startRow: 2, startCol: 0, direction: 'across' as const, length: 3 },
      { id: 4, clue: "Large body of water", answer: "OCEAN", startRow: 4, startCol: 2, direction: 'across' as const, length: 5 },
      { id: 5, clue: "Yellow fruit", answer: "BANANA", startRow: 6, startCol: 1, direction: 'across' as const, length: 6 },
      { id: 6, clue: "Red fruit", answer: "APPLE", startRow: 8, startCol: 3, direction: 'across' as const, length: 5 },
      { id: 7, clue: "Programming language", answer: "PYTHON", startRow: 10, startCol: 0, direction: 'across' as const, length: 6 },
      { id: 8, clue: "Web browser", answer: "CHROME", startRow: 12, startCol: 2, direction: 'across' as const, length: 6 },
      
      { id: 9, clue: "Opposite of up", answer: "DOWN", startRow: 0, startCol: 0, direction: 'down' as const, length: 4 },
      { id: 10, clue: "Frozen water", answer: "ICE", startRow: 0, startCol: 2, direction: 'down' as const, length: 3 },
      { id: 11, clue: "Hot beverage", answer: "COFFEE", startRow: 0, startCol: 5, direction: 'down' as const, length: 6 },
      { id: 12, clue: "Night bird", answer: "OWL", startRow: 2, startCol: 2, direction: 'down' as const, length: 3 },
      { id: 13, clue: "Tree fruit", answer: "ORANGE", startRow: 4, startCol: 4, direction: 'down' as const, length: 6 },
      { id: 14, clue: "Computer input device", answer: "MOUSE", startRow: 6, startCol: 1, direction: 'down' as const, length: 5 },
      { id: 15, clue: "Social media platform", answer: "TWITTER", startRow: 6, startCol: 6, direction: 'down' as const, length: 7 }
    ]
  };

  // Initialize crossword grid
  const initializeGrid = () => {
    const size = sampleCrossword.size;
    const newGrid: CrosswordGrid = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => ({ letter: null, isBlack: true }))
    );

    // Place words and mark cells as white
    sampleCrossword.clues.forEach(clue => {
      const { answer, startRow, startCol, direction } = clue;
      
      for (let i = 0; i < answer.length; i++) {
        const row = direction === 'across' ? startRow : startRow + i;
        const col = direction === 'across' ? startCol + i : startCol;
        
        if (row < size && col < size) {
          newGrid[row][col] = {
            letter: answer[i],
            isBlack: false,
            number: i === 0 ? clue.id : newGrid[row][col].number,
            userLetter: ''
          };
        }
      }
    });

    setGrid(newGrid);
    setClues(sampleCrossword.clues);
    setIsRunning(true);
    setTimer(0);
    setIsComplete(false);
    setHints(3);
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].isBlack || isComplete) return;
    
    setSelectedCell([row, col]);
    
    // Find clue that contains this cell
    const containingClues = clues.filter(clue => {
      const { startRow, startCol, direction, answer } = clue;
      if (direction === 'across') {
        return row === startRow && col >= startCol && col < startCol + answer.length;
      } else {
        return col === startCol && row >= startRow && row < startRow + answer.length;
      }
    });

    // Select clue based on current direction preference
    const preferredClue = containingClues.find(clue => clue.direction === direction);
    const clueToSelect = preferredClue || containingClues[0];
    
    if (clueToSelect) {
      setSelectedClue(clueToSelect);
      setDirection(clueToSelect.direction);
    }
  };

  // Handle letter input
  const handleLetterInput = (letter: string) => {
    if (!selectedCell || isComplete) return;
    
    const [row, col] = selectedCell;
    if (grid[row][col].isBlack) return;

    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      userLetter: letter.toUpperCase()
    };
    
    setGrid(newGrid);
    
    // Move to next cell in the selected clue
    if (selectedClue) {
      moveToNextCell();
    }
    
    // Check if crossword is complete
    checkCompletion(newGrid);
  };

  // Move to next cell in current clue
  const moveToNextCell = () => {
    if (!selectedClue || !selectedCell) return;
    
    const [currentRow, currentCol] = selectedCell;
    const { startRow, startCol, direction, answer } = selectedClue;
    
    let nextRow = currentRow;
    let nextCol = currentCol;
    
    if (direction === 'across') {
      nextCol++;
      if (nextCol >= startCol + answer.length) return; // End of word
    } else {
      nextRow++;
      if (nextRow >= startRow + answer.length) return; // End of word
    }
    
    if (nextRow < grid.length && nextCol < grid[0].length && !grid[nextRow][nextCol].isBlack) {
      setSelectedCell([nextRow, nextCol]);
    }
  };

  // Check if crossword is complete
  const checkCompletion = (currentGrid: CrosswordGrid) => {
    const isComplete = currentGrid.every(row =>
      row.every(cell => 
        cell.isBlack || (cell.userLetter && cell.userLetter === cell.letter)
      )
    );
    
    if (isComplete) {
      setIsComplete(true);
      setIsRunning(false);
    }
  };

  // Clear cell
  const clearCell = () => {
    if (!selectedCell || isComplete) return;
    
    const [row, col] = selectedCell;
    if (grid[row][col].isBlack) return;

    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      userLetter: ''
    };
    
    setGrid(newGrid);
  };

  // Use hint
  const useHint = () => {
    if (hints <= 0 || !selectedCell || isComplete) return;
    
    const [row, col] = selectedCell;
    if (grid[row][col].isBlack) return;

    const correctLetter = grid[row][col].letter;
    if (correctLetter) {
      handleLetterInput(correctLetter);
      setHints(hints - 1);
    }
  };

  // Handle clue selection
  const handleClueClick = (clue: CrosswordClue) => {
    setSelectedClue(clue);
    setDirection(clue.direction);
    setSelectedCell([clue.startRow, clue.startCol]);
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
      
      if (e.key.match(/[a-zA-Z]/)) {
        handleLetterInput(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        clearCell();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleArrowKey(e.key);
      }
    };

    const handleArrowKey = (key: string) => {
      if (!selectedCell) return;
      
      const [row, col] = selectedCell;
      let newRow = row;
      let newCol = col;
      
      switch (key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          break;
        case 'ArrowDown':
          newRow = Math.min(grid.length - 1, row + 1);
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          break;
        case 'ArrowRight':
          newCol = Math.min(grid[0].length - 1, col + 1);
          break;
      }
      
      if (!grid[newRow][newCol].isBlack) {
        handleCellClick(newRow, newCol);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, isComplete, grid]);

  // Initialize on mount
  useEffect(() => {
    initializeGrid();
  }, []);

  const acrossClues = clues.filter(clue => clue.direction === 'across');
  const downClues = clues.filter(clue => clue.direction === 'down');

  return (
    <div className="crossword-page">
      <div className="container">
        <div className="game-header">
          <Link to="/projects" className="back-link">
            <FaArrowLeft />
            Back to Projects
          </Link>
          <h1 className="game-title">Crossword</h1>
          <p className="game-description">
            Fill in the crossword puzzle using the clues provided
          </p>
        </div>

        <div className="crossword-container">
          <div className="game-controls">
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
              <button className="new-game-button" onClick={initializeGrid}>
                <FaRedo />
                New Game
              </button>
            </div>
          </div>

          {isComplete && (
            <div className="completion-message">
              <FaTrophy />
              <span>Congratulations! You completed the crossword in {formatTime(timer)}!</span>
            </div>
          )}

          <div className="crossword-main">
            <div className="crossword-grid">
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="crossword-row">
                  {row.map((cell, colIndex) => {
                    const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
                    const isHighlighted = selectedClue && (
                      (selectedClue.direction === 'across' && 
                       rowIndex === selectedClue.startRow && 
                       colIndex >= selectedClue.startCol && 
                       colIndex < selectedClue.startCol + selectedClue.answer.length) ||
                      (selectedClue.direction === 'down' && 
                       colIndex === selectedClue.startCol && 
                       rowIndex >= selectedClue.startRow && 
                       rowIndex < selectedClue.startRow + selectedClue.answer.length)
                    );

                    return (
                      <div
                        key={colIndex}
                        className={`crossword-cell ${cell.isBlack ? 'black' : 'white'} ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {!cell.isBlack && (
                          <>
                            {cell.number && <span className="cell-number">{cell.number}</span>}
                            <span className="cell-letter">{cell.userLetter || ''}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="clues-panel">
              <div className="clues-section">
                <h3>Across</h3>
                <div className="clues-list">
                  {acrossClues.map(clue => (
                    <div
                      key={clue.id}
                      className={`clue-item ${selectedClue?.id === clue.id ? 'selected' : ''}`}
                      onClick={() => handleClueClick(clue)}
                    >
                      <span className="clue-number">{clue.id}</span>
                      <span className="clue-text">{clue.clue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="clues-section">
                <h3>Down</h3>
                <div className="clues-list">
                  {downClues.map(clue => (
                    <div
                      key={clue.id}
                      className={`clue-item ${selectedClue?.id === clue.id ? 'selected' : ''}`}
                      onClick={() => handleClueClick(clue)}
                    >
                      <span className="clue-number">{clue.id}</span>
                      <span className="clue-text">{clue.clue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crossword;