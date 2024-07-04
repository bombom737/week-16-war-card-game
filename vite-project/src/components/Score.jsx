import React from 'react';

export default function Score({ playerName, playerScore, computerScore }) {
  return (
    <div>
      <p>{playerName}: {playerScore}</p>
      <p>Computer: {computerScore}</p>
    </div>
  );
}
