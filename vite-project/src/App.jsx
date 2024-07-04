import './App.css';
import HomePage from './views/HomePage';
import GamePage from './views/GamePage';
import { useState } from 'react';

const pages = {
  home: 0,
  game: 1,
}

function App() {
  const [player, setPlayer] = useState({ cardDeck: [] });
  const [computer, setComputer] = useState({ cardDeck: [] });
  const [page, setPage] = useState(pages.home);

  function setView(page) {
    switch (page) {
      case pages.home:
        return <HomePage setPage={setPage} setPlayer={setPlayer} />;
      case pages.game:
        return (
          <GamePage
            player={player}
            setPlayer={setPlayer}
            computer={computer}
            setComputer={setComputer}
          />
        );
      default:
        return <HomePage setPage={setPage} setPlayer={setPlayer} />;
    }
  }

  return (
    <div className='App'>
      {setView(page)}
    </div>
  );
}

export default App;
