import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Quiz from './Quiz';
import Navbar from './Navbar';
import PracticeScreen from './PracticeScreen';
import RankScreen from './RankScreen';
import Login from './Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<RankScreen />} />
          <Route path="/create" element={<Login />} />
          <Route path="/" element={<PracticeScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
