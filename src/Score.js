import { useState } from 'react';

function Score({commentScore}) {
  const [score, setScore] = useState(commentScore);

  function incrementScore() {
    setScore(score + 1);
  }

  function decrementScore() {
    setScore(score - 1);
  }

  return (
    <div className="score">
      <button className="score-plus" onClick={incrementScore}>
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
      </button>

      <div className="score-number">{score}</div>
      
      <button className="score-minus" onClick={decrementScore}>
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
      </button>
    </div>
  );
}

export default Score;
