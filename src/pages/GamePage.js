import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Game components would be imported here

function GamePage() {
  const [searchParams] = useSearchParams();
  const [currentQuarter, setCurrentQuarter] = useState('Q12024'); // Default to Q1 2024
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState('intro'); // intro, playing, results
  
  useEffect(() => {
    // Read quarter from URL if present
    const quarterParam = searchParams.get('quarter');
    if (quarterParam) {
      setCurrentQuarter(quarterParam);
    }
    
    // Simulating loading game data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchParams]);
  
  const startGame = () => {
    setGameState('playing');
  };
  
  const finishGame = (results) => {
    setGameState('results');
    // Would save results to Firebase here
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading game data...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Whiskey Wiz - {currentQuarter}</h1>
      
      {gameState === 'intro' && (
        <div className="bg-amber-50 p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Blind Barrels Tasting Game!</h2>
          <p className="mb-6">Test your whiskey knowledge by identifying characteristics of each sample.</p>
          <button 
            onClick={startGame}
            className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded"
          >
            Start Tasting
          </button>
        </div>
      )}
      
      {gameState === 'playing' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Game interface would be here...</p>
          <button 
            onClick={() => finishGame({ score: 85 })}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Finish Game
          </button>
        </div>
      )}
      
      {gameState === 'results' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Your Results</h2>
          <p className="text-xl mb-4">Score: 85/100</p>
          <p className="mb-6">Great job! You correctly identified most characteristics.</p>
          <button 
            onClick={() => setGameState('intro')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default GamePage;