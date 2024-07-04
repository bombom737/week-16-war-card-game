import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Score from '../components/Score';
import './GamePage.css'

function generateCardsDeck() {
  let deck = [];
  for (let i = 1; i <= 13; i++) {
    deck.push(i, i, i, i);
  }
  deck.push('J', 'J'); // Add two "J" (for joker, of course) cards to the deck
  return deck;
}

export default function GamePage({ player, computer, setPlayer, setComputer }) {
  const [deck, setDeck] = useState(generateCardsDeck);
  const [result, setResult] = useState('');
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  function randomizeCards(root) {
    const shuffledRoot = root.sort(() => Math.random() - 0.5);
    const halfway = Math.floor(shuffledRoot.length / 2);
    setPlayer({ ...player, cardDeck: shuffledRoot.slice(0, halfway) });
    setComputer({ ...computer, cardDeck: shuffledRoot.slice(halfway) });
  }

  function resetGame() {
    setDeck(generateCardsDeck());
    setPlayerCard(null);
    setComputerCard(null);
    setPlayerWins(0);
    setComputerWins(0);
    setResult('');
    setGameOver(false);
  }

  function drawCards() {
    if (gameOver) {
      resetGame();
      return;
    }

    if (player?.cardDeck?.length > 0 && computer?.cardDeck?.length > 0) {
      const playerCard = player.cardDeck[0];
      const computerCard = computer.cardDeck[0];
      setPlayerCard(playerCard);
      setComputerCard(computerCard);
      setPlayer({ ...player, cardDeck: player.cardDeck.slice(1) });
      setComputer({ ...computer, cardDeck: computer.cardDeck.slice(1) });

      if (playerCard === 'J' && computerCard === 'J') {
        setResult(`It's a tie!`);
      } else if (playerCard === 'J') {
        setResult(`${player.name} wins this round!`);
        setPlayerWins(playerWins + 1);
      } else if (computerCard === 'J') {
        setResult('Computer wins this round!');
        setComputerWins(computerWins + 1);
      } else if (playerCard > computerCard) {
        setResult(`${player.name} wins this round!`);
        setPlayerWins(playerWins + 1);
      } else if (playerCard < computerCard) {
        setResult('Computer wins this round!');
        setComputerWins(computerWins + 1);
      } else {
        setResult(`It's a tie!`);
      }

      if (player.cardDeck.length === 1 && computer.cardDeck.length === 1) {
        if (playerWins > computerWins) {
          setPlayerScore(playerScore + 1);
          setResult(`${player.name} wins! Click "Restart Game" to play again.`);
        } else if (computerWins > playerWins) {
          setComputerScore(computerScore + 1);
          setResult('Computer wins! Click "Restart Game" to play again.');
        } else {
          setResult(`It's a tie! Click "Restart Game" to play again.`);
        }
        setGameOver(true);
        setIsDisabled(true);
        setTimeout(() => { setIsDisabled(false); }, 1000);
      }
    } else {
      setResult(`Couldn't determine winner. Click "Restart Game" to play again.`);
      setGameOver(true);
    }
  }

  useEffect(() => {
    randomizeCards(deck);
  }, [deck]);

  return (
    <div className="game-container">
      <h2>Computer's Card:</h2>
      <div className="cards-container">
        {computerCard !== null ? <Card value={computerCard} /> : <Card value={'N/A'} />}
        <button disabled={isDisabled} onClick={drawCards}>{gameOver ? "Restart Game" : (!result ? "Start Game" : "Draw Cards")}</button>
        <p>{result}</p>
        {playerCard !== null ? <Card value={playerCard} /> : <Card value={'N/A'} />}
      </div>
      <h2>{player.name}'s Card:</h2>
      <Score playerName={player.name} playerScore={playerScore} computerScore={computerScore} />
    </div>
  );
}
