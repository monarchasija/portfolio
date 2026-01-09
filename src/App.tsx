import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import TicTacToe from './pages/TicTacToe/TicTacToe';
import Study from './pages/Study/Study';
import Sudoku from './pages/Sudoku/Sudoku';
import Crossword from './pages/Crossword/Crossword';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/study" element={<Study />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/crossword" element={<Crossword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;