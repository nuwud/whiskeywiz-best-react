/**
 * Format a number as a percentage
 * @param {number} value - The value to format (e.g., 0.42)
 * @param {number} digits - Number of decimal digits
 * @returns {string} Formatted percentage (e.g., "42%")
 */
export const formatPercentage = (value, digits = 0) => {
  return (value * 100).toFixed(digits) + '%';
};

/**
 * Format a date as a human-readable string
 * @param {string|Date} date - ISO date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format a score as a fraction
 * @param {number} score - Points earned
 * @param {number} maxScore - Maximum possible points
 * @returns {string} Formatted score (e.g., "85/100")
 */
export const formatScore = (score, maxScore) => {
  return `${score}/${maxScore}`;
};

/**
 * Format a currency value
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};
