// Interfaces for the WhiskeyWiz game models

/**
 * @typedef {Object} Quarter
 * @property {string} id - Unique identifier
 * @property {string} name - Quarter name (e.g., "Q1 2024")
 * @property {string} description - Description of this quarter's selection
 * @property {string} releaseDate - ISO Date string when this quarter was released
 * @property {boolean} active - Whether this quarter is currently active
 * @property {string} createdAt - ISO Date string creation timestamp
 * @property {string} updatedAt - ISO Date string last update timestamp
 * @property {Sample[]} samples - Array of samples in this quarter
 * @property {Question[]} questions - Array of questions in this quarter
 */

/**
 * @typedef {Object} Sample
 * @property {string} id - Unique identifier
 * @property {string} name - Sample name
 * @property {string} description - Description of the sample
 * @property {string} imageUrl - URL to sample image
 * @property {number} order - Display order of the sample
 * @property {Object} attributes - Sample attributes
 * @property {string} attributes.type - Whiskey type (Bourbon, Scotch, etc.)
 * @property {number} attributes.age - Age in years
 * @property {string} attributes.region - Region of production
 * @property {string} attributes.flavor - Primary flavor profile
 * @property {number} attributes.strength - Alcohol percentage
 * @property {string} attributes.finish - Finish description
 */

/**
 * @typedef {Object} Question
 * @property {string} id - Unique identifier
 * @property {string} text - Question text
 * @property {('multiple-choice'|'slider'|'text')} type - Question type
 * @property {QuestionOption[]} options - Available options for multiple choice
 * @property {(string|number|string[])} correctAnswer - Correct answer value(s)
 * @property {number} points - Points awarded for correct answer
 * @property {string} hint - Optional hint for the question
 * @property {string} sample - References Sample ID this question is about
 * @property {string} attribute - Which attribute this question is about
 */

/**
 * @typedef {Object} QuestionOption
 * @property {string} id - Unique identifier
 * @property {string} text - Option text
 * @property {(string|number)} value - Option value
 * @property {boolean} isCorrect - Whether this is the correct option
 */

/**
 * @typedef {Object} UserAnswer
 * @property {string} questionId - Question this answer is for
 * @property {(string|number|string[])} answer - User's answer
 * @property {boolean} isCorrect - Whether the answer was correct
 * @property {number} pointsEarned - Points earned for this answer
 * @property {string} timestamp - When the answer was submitted
 */

/**
 * @typedef {Object} QuarterResult
 * @property {string} userId - User who completed this quarter
 * @property {string} quarterId - Quarter ID
 * @property {number} totalScore - Total points earned
 * @property {number} maxScore - Maximum possible points
 * @property {string} completedAt - When the quarter was completed
 * @property {UserAnswer[]} answers - Array of user answers
 * @property {Object.<string, number>} sampleRatings - Rating for each sample
 * @property {string} favoriteId - ID of favorite sample
 * @property {string} leastFavoriteId - ID of least favorite sample
 * @property {string} userNotes - User's notes about this quarter
 * @property {boolean} shared - Whether this result has been shared
 */

/**
 * Validate a Quarter object
 * @param {Quarter} quarter - Quarter to validate
 * @returns {string[]} Array of error messages, empty if valid
 */
export const validateQuarter = (quarter) => {
  const errors = [];
  
  if (!quarter.name) errors.push('Quarter name is required');
  if (!quarter.releaseDate) errors.push('Release date is required');
  
  return errors;
};

/**
 * Validate a Sample object
 * @param {Sample} sample - Sample to validate
 * @returns {string[]} Array of error messages, empty if valid
 */
export const validateSample = (sample) => {
  const errors = [];
  
  if (!sample.name) errors.push('Sample name is required');
  if (sample.order === undefined || sample.order < 0) {
    errors.push('Valid sample order is required');
  }
  
  return errors;
};

/**
 * Validate a Question object
 * @param {Question} question - Question to validate
 * @returns {string[]} Array of error messages, empty if valid
 */
export const validateQuestion = (question) => {
  const errors = [];
  
  if (!question.text) errors.push('Question text is required');
  if (!question.type) errors.push('Question type is required');
  if (!question.sample) errors.push('Question must be associated with a sample');
  
  if (question.type === 'multiple-choice' && (!question.options || question.options.length < 2)) {
    errors.push('Multiple choice questions require at least 2 options');
  }
  
  return errors;
};