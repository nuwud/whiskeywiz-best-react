import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ResultsComponent = ({ results, correctAnswers, onPlayAgain, onShare }) => {
  const { currentUser } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  
  if (!results || !correctAnswers) {
    return <div>No results available</div>;
  }
  
  // Calculate score
  const totalQuestions = Object.keys(correctAnswers).length;
  const userScore = Object.keys(results.answers || {}).reduce((score, sampleId) => {
    const userAnswers = results.answers[sampleId];
    const correct = correctAnswers[sampleId];
    
    let sampleScore = 0;
    if (userAnswers.type === correct.type) sampleScore += 10;
    if (userAnswers.region === correct.region) sampleScore += 10;
    
    // Age within 2 years counts as correct
    const ageDifference = Math.abs(userAnswers.age - correct.age);
    if (ageDifference <= 2) {
      sampleScore += 10 - (ageDifference * 2); // Full points for exact, -2 for each year off
    }
    
    // Strength within 2% counts as correct with decreasing points
    const strengthDifference = Math.abs(userAnswers.strength - correct.strength);
    if (strengthDifference <= 5) {
      sampleScore += 10 - strengthDifference; // Full points for exact, -1 for each % off
    }
    
    return score + sampleScore;
  }, 0);
  
  const maxPossibleScore = totalQuestions * 40; // 40 points per sample (10 per attribute)
  const scorePercentage = Math.round((userScore / maxPossibleScore) * 100);
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  // Find favorite and least favorite samples
  const sampleRatings = results.ratings || {};
  const sampleIds = Object.keys(sampleRatings);
  
  let favoriteId = '';
  let leastFavoriteId = '';
  
  if (sampleIds.length > 0) {
    favoriteId = sampleIds.reduce((a, b) => 
      sampleRatings[a] > sampleRatings[b] ? a : b
    );
    
    leastFavoriteId = sampleIds.reduce((a, b) => 
      sampleRatings[a] < sampleRatings[b] ? a : b
    );
  }
  
  const handleShareResults = () => {
    if (currentUser) {
      onShare({
        ...results,
        userScore,
        maxPossibleScore,
        favoriteId,
        leastFavoriteId,
        shared: true
      });
    } else {
      // Prompt to login for sharing
      alert('Please login to share your results!');
    }
  };
  
  return (
    <div className="results-container">
      <div className="result-card">
        <h2 className="text-2xl font-bold mb-4">Your Tasting Results</h2>
        
        <div className="score-display">
          <div className="text-4xl font-bold">{scorePercentage}%</div>
          <div className="text-lg">{userScore} / {maxPossibleScore} points</div>
        </div>
        
        <div className="mt-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Palate Profile</h3>
          <p>
            Based on your answers, you show a good ability to identify 
            {scorePercentage >= 80 ? ' subtle flavor profiles and whiskey characteristics.' :
             scorePercentage >= 60 ? ' core whiskey characteristics and styles.' :
             scorePercentage >= 40 ? ' basic whiskey profiles with room to improve your palate.' :
             ' whiskey characteristics, but might benefit from more tasting experience.'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold">Your Favorite</h4>
            <p>Sample {String.fromCharCode(65 + sampleIds.indexOf(favoriteId))}</p>
            <p className="text-lg font-bold">{sampleRatings[favoriteId]}/10</p>
          </div>
          
          <div className="flex-1 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold">Your Least Favorite</h4>
            <p>Sample {String.fromCharCode(65 + sampleIds.indexOf(leastFavoriteId))}</p>
            <p className="text-lg font-bold">{sampleRatings[leastFavoriteId]}/10</p>
          </div>
        </div>
        
        <button 
          onClick={toggleDetails}
          className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded mb-4 flex justify-between items-center"
        >
          <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
          <span>{showDetails ? '↑' : '↓'}</span>
        </button>
        
        {showDetails && (
          <div className="details-section mb-6">
            <h3 className="text-xl font-semibold mb-4">Detailed Results</h3>
            
            {Object.keys(results.answers || {}).map((sampleId, index) => {
              const userAnswers = results.answers[sampleId];
              const correct = correctAnswers[sampleId];
              const sampleLetter = String.fromCharCode(65 + index);
              
              return (
                <div key={sampleId} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold mb-2">Sample {sampleLetter}</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold">Your Answers</h5>
                      <ul className="list-disc list-inside">
                        <li>Type: <span className={userAnswers.type === correct.type ? 'correct-answers' : 'incorrect-answers'}>{userAnswers.type || 'Not answered'}</span></li>
                        <li>Region: <span className={userAnswers.region === correct.region ? 'correct-answers' : 'incorrect-answers'}>{userAnswers.region || 'Not answered'}</span></li>
                        <li>Age: <span className={Math.abs(userAnswers.age - correct.age) <= 2 ? 'correct-answers' : 'incorrect-answers'}>{userAnswers.age} years</span></li>
                        <li>Strength: <span className={Math.abs(userAnswers.strength - correct.strength) <= 2 ? 'correct-answers' : 'incorrect-answers'}>{userAnswers.strength}%</span></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold">Correct Answers</h5>
                      <ul className="list-disc list-inside">
                        <li>Type: {correct.type}</li>
                        <li>Region: {correct.region}</li>
                        <li>Age: {correct.age} years</li>
                        <li>Strength: {correct.strength}%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleShareResults}
            className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
          >
            Share Results
          </button>
          
          <button 
            onClick={onPlayAgain}
            className="flex-1 py-2 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsComponent;